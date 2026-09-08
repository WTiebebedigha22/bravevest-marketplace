import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FirebaseService } from '../firebase/firebase.service';
import { EmailService } from '../email/email.service';
import { TwoFactorService } from './two-factor.service';
import { RegisterDto, UserRole } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly firebase: FirebaseService,
    private readonly config: ConfigService,
    private readonly twoFactor: TwoFactorService,
    private readonly email: EmailService,
  ) {}

  async register(dto: RegisterDto) {
    if (await this.findProfileByEmail(dto.email)) {
      throw new ConflictException('User with this email already exists');
    }

    const authUser = await this.firebase.getAuth().createUser({
      email: dto.email,
      password: dto.password,
      displayName: [dto.firstName, dto.lastName].filter(Boolean).join(' ') || undefined,
    });
    const { secret, otpauthUrl } = this.twoFactor.generateSecret(dto.email);
    const profile = this.clean({
      email: dto.email,
      phone: dto.phone,
      role: dto.role || UserRole.INVESTOR,
      accountType: dto.accountType,
      firstName: dto.firstName,
      lastName: dto.lastName,
      dateOfBirth: dto.dateOfBirth,
      businessName: dto.businessName,
      businessRegistrationNumber: dto.businessRegistrationNumber,
      businessType: dto.businessType,
      businessIndustry: dto.businessIndustry,
      businessAddress: dto.businessAddress,
      yearsInOperation: dto.yearsInOperation ? Number(dto.yearsInOperation) : undefined,
      nationality: dto.nationality,
      countryOfResidence: dto.countryOfResidence,
      investorType: dto.investorType,
      city: dto.city,
      address: dto.address,
      referralCode: dto.referralCode,
      investmentExperience: dto.investmentExperience,
      riskTolerance: dto.riskTolerance,
      investmentGoals: dto.investmentGoals || [],
      preferredSectors: dto.preferredSectors || [],
      taxId: dto.taxId,
      isPEP: dto.isPEP || false,
      isTwoFactorEnabled: false,
      twoFactorSecret: secret,
      kycStatus: 'pending',
      wallets: [{ balance: 0, currency: 'NGN' }],
      createdAt: this.firebase.serverTimestamp(),
    });

    await this.firebase.getFirestore().collection('users').doc(authUser.uid).set(profile);
    await this.email.sendWelcomeEmail(dto.email, dto.firstName || 'Investor');

    return {
      user: this.sanitize({ id: authUser.uid, ...profile }),
      twoFactor: { secret, otpauthUrl },
    };
  }

  async login(dto: LoginDto) {
    const apiKey = this.config.get<string>('FIREBASE_WEB_API_KEY');
    if (!apiKey) throw new BadRequestException('FIREBASE_WEB_API_KEY is not configured');

    const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: dto.email, password: dto.password, returnSecureToken: true }),
    });
    if (!response.ok) throw new UnauthorizedException('Invalid credentials');

    const result = await response.json() as { localId: string; idToken: string; refreshToken: string };
    const profile = await this.getProfile(result.localId);
    if (profile.isTwoFactorEnabled) return { requires2FA: true, userId: result.localId };
    return { user: profile, accessToken: result.idToken, refreshToken: result.refreshToken };
  }

  async verify2FA(userId: string, code: string) {
    const profile = await this.getProfile(userId);
    if (!this.twoFactor.verifySecret(profile.twoFactorSecret, code)) {
      throw new BadRequestException('Invalid 2FA code');
    }
    await this.firebase.getFirestore().collection('users').doc(userId).update({ isTwoFactorEnabled: true });
    return { user: this.sanitize({ ...profile, isTwoFactorEnabled: true }) };
  }

  async refreshToken(refreshToken: string) {
    const apiKey = this.config.get<string>('FIREBASE_WEB_API_KEY');
    if (!apiKey) throw new BadRequestException('FIREBASE_WEB_API_KEY is not configured');
    const response = await fetch(`https://securetoken.googleapis.com/v1/token?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ grant_type: 'refresh_token', refresh_token: refreshToken }),
    });
    if (!response.ok) throw new UnauthorizedException('Invalid refresh token');
    const result = await response.json() as { id_token: string; refresh_token: string };
    return { accessToken: result.id_token, refreshToken: result.refresh_token };
  }

  async getProfile(userId: string) {
    const snapshot = await this.firebase.getFirestore().collection('users').doc(userId).get();
    if (!snapshot.exists) throw new UnauthorizedException('User not found');
    return this.sanitize({ id: snapshot.id, ...snapshot.data() });
  }

  async logout(_userId: string) {
    return { success: true };
  }

  private async findProfileByEmail(email: string) {
    const snapshot = await this.firebase.getFirestore().collection('users').where('email', '==', email).limit(1).get();
    return snapshot.empty ? null : snapshot.docs[0].data();
  }

  private sanitize(user: any) {
    const { twoFactorSecret, passwordHash, ...safeUser } = user;
    return safeUser;
  }

  private clean(data: Record<string, unknown>) {
    return Object.fromEntries(Object.entries(data).filter(([, value]) => value !== undefined));
  }
}
