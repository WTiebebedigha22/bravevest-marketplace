// apps/api/src/auth/auth.service.ts
import { Injectable, UnauthorizedException, ConflictException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto, UserRole, AccountType } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { TwoFactorService } from './two-factor.service';
import { EmailService } from '../email/email.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private twoFactorService: TwoFactorService,
    private emailService: EmailService,
  ) {}

  async register(registerDto: RegisterDto) {
    // Check if user exists
    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [
          { email: registerDto.email },
          { phone: registerDto.phone },
        ],
      },
    });

    if (existingUser) {
      throw new ConflictException('User with this email or phone already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    // Create user
    const user = await this.prisma.user.create({
      data: {
        email: registerDto.email,
        phone: registerDto.phone,
        passwordHash: hashedPassword,
        role: registerDto.role || UserRole.INVESTOR,
        accountType: registerDto.accountType,
        firstName: registerDto.firstName,
        lastName: registerDto.lastName,
        dateOfBirth: registerDto.dateOfBirth ? new Date(registerDto.dateOfBirth) : null,
        businessName: registerDto.businessName,
        businessRegistrationNumber: registerDto.businessRegistrationNumber,
        businessType: registerDto.businessType,
        businessIndustry: registerDto.businessIndustry,
        businessAddress: registerDto.businessAddress,
        yearsInOperation: registerDto.yearsInOperation ? parseInt(registerDto.yearsInOperation) : null,
        nationality: registerDto.nationality,
        countryOfResidence: registerDto.countryOfResidence,
        investorType: registerDto.investorType,
        city: registerDto.city,
        address: registerDto.address,
        referralCode: registerDto.referralCode,
        investmentExperience: registerDto.investmentExperience,
        riskTolerance: registerDto.riskTolerance,
        investmentGoals: registerDto.investmentGoals || [],
        preferredSectors: registerDto.preferredSectors || [],
        taxId: registerDto.taxId,
        isPEP: registerDto.isPEP || false,
        wallets: {
          create: {
            currency: 'NGN',
            balance: 0,
          },
        },
      },
    });

    // Generate 2FA secret
    const { secret, otpauthUrl } = this.twoFactorService.generateSecret(user.email);

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        twoFactorSecret: secret,
      },
    });

    // Send welcome email
    await this.emailService.sendWelcomeEmail(user.email, user.firstName || 'Investor');

    const tokens = this.generateTokens(user.id, user.email, user.role);

    return {
      user: this.sanitizeUser(user),
      ...tokens,
      twoFactor: {
        secret,
        otpauthUrl,
      },
    };
  }

  async login(loginDto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: loginDto.email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(loginDto.password, user.passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (user.isTwoFactorEnabled) {
      return {
        requires2FA: true,
        userId: user.id,
        message: '2FA verification required',
      };
    }

    const tokens = this.generateTokens(user.id, user.email, user.role);

    await this.prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    return {
      user: this.sanitizeUser(user),
      ...tokens,
    };
  }

  async verify2FA(userId: string, code: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const isValid = this.twoFactorService.verifySecret(user.twoFactorSecret, code);
    if (!isValid) {
      throw new BadRequestException('Invalid 2FA code');
    }

    if (!user.isTwoFactorEnabled) {
      await this.prisma.user.update({
        where: { id: user.id },
        data: { isTwoFactorEnabled: true },
      });
    }

    const tokens = this.generateTokens(user.id, user.email, user.role);

    return {
      user: this.sanitizeUser(user),
      ...tokens,
    };
  }

  async refreshToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
      });

      const user = await this.prisma.user.findUnique({
        where: { id: payload.sub },
      });

      if (!user) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      const tokens = this.generateTokens(user.id, user.email, user.role);
      return tokens;
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async getProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        wallets: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return this.sanitizeUser(user);
  }

  async logout(userId: string) {
    return { success: true };
  }

  private generateTokens(userId: string, email: string, role: string) {
    const payload = { sub: userId, email, role };
    
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_SECRET'),
      expiresIn: '30d',
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  private sanitizeUser(user: any) {
    const { passwordHash, twoFactorSecret, ...result } = user;
    return result;
  }
}