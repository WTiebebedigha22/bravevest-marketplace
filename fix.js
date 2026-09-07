// fix-api.js - Run with: node fix-api.js
const fs = require('fs');
const path = require('path');

const rootDir = process.cwd();

console.log('🚀 Building BraveVest Backend API...\n');

// ============================================
// 1. CREATE API PACKAGE.JSON
// ============================================
console.log('📦 Creating package.json...');

const apiPackageJson = `{
  "name": "@bravevest/api",
  "version": "0.0.1",
  "scripts": {
    "build": "nest build",
    "start": "nest start",
    "start:dev": "nest start --watch",
    "start:debug": "nest start --debug --watch",
    "start:prod": "node dist/main",
    "lint": "eslint \"{src,apps,libs,test}/**/*.ts\" --fix",
    "clean": "rm -rf dist"
  },
  "dependencies": {
    "@nestjs/common": "^10.0.0",
    "@nestjs/core": "^10.0.0",
    "@nestjs/platform-express": "^10.0.0",
    "@nestjs/jwt": "^10.0.0",
    "@nestjs/passport": "^10.0.0",
    "@nestjs/bull": "^10.0.0",
    "@nestjs/config": "^3.0.0",
    "@prisma/client": "^5.0.0",
    "passport": "^0.7.0",
    "passport-jwt": "^4.0.1",
    "passport-local": "^1.0.0",
    "bcrypt": "^5.1.0",
    "class-validator": "^0.14.0",
    "class-transformer": "^0.5.1",
    "bull": "^4.11.0",
    "ioredis": "^5.3.0",
    "nodemailer": "^6.9.0",
    "speakeasy": "^2.0.0",
    "qrcode": "^1.5.0"
  },
  "devDependencies": {
    "@nestjs/cli": "^10.0.0",
    "@nestjs/schematics": "^10.0.0",
    "@nestjs/testing": "^10.0.0",
    "@types/express": "^4.17.0",
    "@types/jest": "^29.5.0",
    "@types/node": "^20.0.0",
    "@types/passport": "^1.0.0",
    "@types/passport-jwt": "^4.0.0",
    "@types/passport-local": "^1.0.0",
    "@types/bcrypt": "^5.0.0",
    "@types/nodemailer": "^6.4.0",
    "@types/speakeasy": "^2.0.0",
    "@types/qrcode": "^1.5.0",
    "@typescript-eslint/eslint-plugin": "^6.0.0",
    "@typescript-eslint/parser": "^6.0.0",
    "jest": "^29.5.0",
    "ts-jest": "^29.1.0",
    "ts-loader": "^9.4.0",
    "ts-node": "^10.9.0",
    "tsconfig-paths": "^4.2.0",
    "typescript": "^5.0.0"
  }
}`;

fs.writeFileSync(
  path.join(rootDir, 'apps/api/package.json'),
  apiPackageJson
);
console.log('  ✅ Created: package.json');

// ============================================
// 2. CREATE NEST CLI CONFIG
// ============================================
console.log('\n📦 Creating nest-cli.json...');

const nestCliJson = `{
  "$schema": "https://json.schemastore.org/nest-cli",
  "collection": "@nestjs/schematics",
  "sourceRoot": "src",
  "compilerOptions": {
    "deleteOutDir": true
  }
}`;

fs.writeFileSync(
  path.join(rootDir, 'apps/api/nest-cli.json'),
  nestCliJson
);
console.log('  ✅ Created: nest-cli.json');

// ============================================
// 3. CREATE TS CONFIG
// ============================================
console.log('\n📦 Creating tsconfig.json...');

const tsConfig = `{
  "compilerOptions": {
    "module": "commonjs",
    "declaration": true,
    "removeComments": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "allowSyntheticDefaultImports": true,
    "target": "ES2021",
    "sourceMap": true,
    "outDir": "./dist",
    "baseUrl": "./",
    "incremental": true,
    "skipLibCheck": true,
    "strictNullChecks": false,
    "noImplicitAny": false,
    "strictBindCallApply": false,
    "forceConsistentCasingInFileNames": false,
    "noFallthroughCasesInSwitch": false,
    "esModuleInterop": true
  }
}`;

fs.writeFileSync(
  path.join(rootDir, 'apps/api/tsconfig.json'),
  tsConfig
);
console.log('  ✅ Created: tsconfig.json');

// ============================================
// 4. CREATE MAIN.TS
// ============================================
console.log('\n📄 Creating main.ts...');

const mainTs = `// apps/api/src/main.ts
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.enableCors({
    origin: configService.get('FRONTEND_URL') || 'http://localhost:5173',
    credentials: true,
  });

  const port = configService.get('PORT') || 3001;
  await app.listen(port);
  console.log(\`🚀 BraveVest API running on http://localhost:\${port}\`);
}
bootstrap();`;

fs.writeFileSync(
  path.join(rootDir, 'apps/api/src/main.ts'),
  mainTs
);
console.log('  ✅ Created: main.ts');

// ============================================
// 5. CREATE APP MODULE
// ============================================
console.log('\n📄 Creating app.module.ts...');

const appModule = `// apps/api/src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { EmailModule } from './email/email.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        redis: {
          host: configService.get('REDIS_HOST', 'localhost'),
          port: configService.get('REDIS_PORT', 6379),
        },
      }),
      inject: [ConfigService],
    }),
    PrismaModule,
    AuthModule,
    UserModule,
    EmailModule,
  ],
})
export class AppModule {}`;

fs.writeFileSync(
  path.join(rootDir, 'apps/api/src/app.module.ts'),
  appModule
);
console.log('  ✅ Created: app.module.ts');

// ============================================
// 6. CREATE PRISMA MODULE
// ============================================
console.log('\n📄 Creating Prisma module...');

// Create prisma directory
if (!fs.existsSync(path.join(rootDir, 'apps/api/src/prisma'))) {
  fs.mkdirSync(path.join(rootDir, 'apps/api/src/prisma'), { recursive: true });
}

const prismaModule = `// apps/api/src/prisma/prisma.module.ts
import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}`;

fs.writeFileSync(
  path.join(rootDir, 'apps/api/src/prisma/prisma.module.ts'),
  prismaModule
);

const prismaService = `// apps/api/src/prisma/prisma.service.ts
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    super({
      log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['error'],
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}`;

fs.writeFileSync(
  path.join(rootDir, 'apps/api/src/prisma/prisma.service.ts'),
  prismaService
);
console.log('  ✅ Created: prisma/');

// ============================================
// 7. CREATE AUTH MODULE
// ============================================
console.log('\n📄 Creating Auth module...');

// Create auth directories
const authDirs = [
  'apps/api/src/auth/dto',
  'apps/api/src/auth/strategies',
  'apps/api/src/auth/guards',
];
authDirs.forEach(dir => {
  if (!fs.existsSync(path.join(rootDir, dir))) {
    fs.mkdirSync(path.join(rootDir, dir), { recursive: true });
  }
});

const authModule = `// apps/api/src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { TwoFactorService } from './two-factor.service';
import { EmailService } from '../email/email.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '7d' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, LocalStrategy, TwoFactorService, EmailService],
  exports: [AuthService],
})
export class AuthModule {}`;

fs.writeFileSync(
  path.join(rootDir, 'apps/api/src/auth/auth.module.ts'),
  authModule
);

// ============================================
// 8. CREATE DTOs
// ============================================
console.log('\n📄 Creating DTOs...');

const registerDto = `// apps/api/src/auth/dto/register.dto.ts
import { IsEmail, IsString, MinLength, IsOptional, IsEnum, IsPhoneNumber, Matches, IsBoolean, IsArray } from 'class-validator';

export enum UserRole {
  INVESTOR = 'investor',
  BORROWER = 'borrower',
  ADMIN = 'admin',
  COMMITTEE = 'committee',
  SUPPORT = 'support',
}

export enum AccountType {
  INDIVIDUAL = 'individual',
  BUSINESS = 'business',
}

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(10)
  phone: string;

  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)/, {
    message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number',
  })
  password: string;

  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;

  @IsEnum(AccountType)
  accountType: AccountType;

  // Individual fields
  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsString()
  dateOfBirth?: string;

  // Business fields
  @IsOptional()
  @IsString()
  businessName?: string;

  @IsOptional()
  @IsString()
  businessRegistrationNumber?: string;

  @IsOptional()
  @IsString()
  businessType?: string;

  @IsOptional()
  @IsString()
  businessIndustry?: string;

  @IsOptional()
  @IsString()
  businessAddress?: string;

  @IsOptional()
  @IsString()
  yearsInOperation?: string;

  @IsOptional()
  @IsString()
  nationality?: string;

  @IsOptional()
  @IsString()
  countryOfResidence?: string;

  @IsOptional()
  @IsString()
  investorType?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  referralCode?: string;

  @IsOptional()
  @IsString()
  investmentExperience?: string;

  @IsOptional()
  @IsString()
  riskTolerance?: string;

  @IsOptional()
  @IsArray()
  investmentGoals?: string[];

  @IsOptional()
  @IsArray()
  preferredSectors?: string[];

  @IsOptional()
  @IsString()
  taxId?: string;

  @IsOptional()
  @IsBoolean()
  isPEP?: boolean;
}`;

fs.writeFileSync(
  path.join(rootDir, 'apps/api/src/auth/dto/register.dto.ts'),
  registerDto
);

const loginDto = `// apps/api/src/auth/dto/login.dto.ts
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}`;

fs.writeFileSync(
  path.join(rootDir, 'apps/api/src/auth/dto/login.dto.ts'),
  loginDto
);

const verify2FADto = `// apps/api/src/auth/dto/verify-2fa.dto.ts
import { IsString, Length, IsUUID } from 'class-validator';

export class Verify2FADto {
  @IsUUID()
  userId: string;

  @IsString()
  @Length(6, 6)
  code: string;
}`;

fs.writeFileSync(
  path.join(rootDir, 'apps/api/src/auth/dto/verify-2fa.dto.ts'),
  verify2FADto
);

const refreshTokenDto = `// apps/api/src/auth/dto/refresh-token.dto.ts
import { IsString } from 'class-validator';

export class RefreshTokenDto {
  @IsString()
  refreshToken: string;
}`;

fs.writeFileSync(
  path.join(rootDir, 'apps/api/src/auth/dto/refresh-token.dto.ts'),
  refreshTokenDto
);

console.log('  ✅ Created: DTOs');

// ============================================
// 9. CREATE AUTH SERVICE
// ============================================
console.log('\n📄 Creating auth.service.ts...');

const authService = `// apps/api/src/auth/auth.service.ts
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
}`;

fs.writeFileSync(
  path.join(rootDir, 'apps/api/src/auth/auth.service.ts'),
  authService
);

// ============================================
// 10. CREATE TWO-FACTOR SERVICE
// ============================================
console.log('\n📄 Creating two-factor.service.ts...');

const twoFactorService = `// apps/api/src/auth/two-factor.service.ts
import { Injectable } from '@nestjs/common';
import * as speakeasy from 'speakeasy';
import * as QRCode from 'qrcode';

@Injectable()
export class TwoFactorService {
  generateSecret(email: string) {
    const secret = speakeasy.generateSecret({
      name: \`BraveVest (\${email})\`,
      length: 20,
    });

    return {
      secret: secret.base32,
      otpauthUrl: secret.otpauth_url,
    };
  }

  verifySecret(secret: string, token: string): boolean {
    return speakeasy.totp.verify({
      secret: secret,
      encoding: 'base32',
      token: token,
      window: 2,
    });
  }

  async generateQRCode(otpauthUrl: string): Promise<string> {
    return QRCode.toDataURL(otpauthUrl);
  }
}`;

fs.writeFileSync(
  path.join(rootDir, 'apps/api/src/auth/two-factor.service.ts'),
  twoFactorService
);

// ============================================
// 11. CREATE STRATEGIES
// ============================================
console.log('\n📄 Creating strategies...');

const jwtStrategy = `// apps/api/src/auth/strategies/jwt.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private prisma: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
      select: {
        id: true,
        email: true,
        role: true,
        firstName: true,
        lastName: true,
        kycStatus: true,
        isTwoFactorEnabled: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return user;
  }
}`;

fs.writeFileSync(
  path.join(rootDir, 'apps/api/src/auth/strategies/jwt.strategy.ts'),
  jwtStrategy
);

const localStrategy = `// apps/api/src/auth/strategies/local.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string) {
    // This would be used for local auth if needed
    return { email };
  }
}`;

fs.writeFileSync(
  path.join(rootDir, 'apps/api/src/auth/strategies/local.strategy.ts'),
  localStrategy
);

console.log('  ✅ Created: strategies');

// ============================================
// 12. CREATE GUARDS
// ============================================
console.log('\n📄 Creating guards...');

const jwtAuthGuard = `// apps/api/src/auth/guards/jwt-auth.guard.ts
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}`;

fs.writeFileSync(
  path.join(rootDir, 'apps/api/src/auth/guards/jwt-auth.guard.ts'),
  jwtAuthGuard
);

const rolesGuard = `// apps/api/src/auth/guards/roles.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!requiredRoles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return requiredRoles.includes(user.role);
  }
}`;

fs.writeFileSync(
  path.join(rootDir, 'apps/api/src/auth/guards/roles.guard.ts'),
  rolesGuard
);

console.log('  ✅ Created: guards');

// ============================================
// 13. CREATE AUTH CONTROLLER
// ============================================
console.log('\n📄 Creating auth.controller.ts...');

const authController = `// apps/api/src/auth/auth.controller.ts
import { Controller, Post, Body, UseGuards, Request, Get, Patch } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Verify2FADto } from './dto/verify-2fa.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('2fa/verify')
  async verify2FA(@Body() verify2FADto: Verify2FADto) {
    return this.authService.verify2FA(verify2FADto.userId, verify2FADto.code);
  }

  @Post('refresh')
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshToken(refreshTokenDto.refreshToken);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Request() req) {
    return this.authService.getProfile(req.user.id);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  async logout(@Request() req) {
    return this.authService.logout(req.user.id);
  }
}`;

fs.writeFileSync(
  path.join(rootDir, 'apps/api/src/auth/auth.controller.ts'),
  authController
);
console.log('  ✅ Created: auth.controller.ts');

// ============================================
// 14. CREATE EMAIL MODULE
// ============================================
console.log('\n📄 Creating Email module...');

if (!fs.existsSync(path.join(rootDir, 'apps/api/src/email'))) {
  fs.mkdirSync(path.join(rootDir, 'apps/api/src/email'), { recursive: true });
}

const emailModule = `// apps/api/src/email/email.module.ts
import { Module } from '@nestjs/common';
import { EmailService } from './email.service';

@Module({
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}`;

fs.writeFileSync(
  path.join(rootDir, 'apps/api/src/email/email.module.ts'),
  emailModule
);

const emailService = `// apps/api/src/email/email.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get('SMTP_HOST'),
      port: parseInt(this.configService.get('SMTP_PORT')) || 587,
      secure: false,
      auth: {
        user: this.configService.get('SMTP_USER'),
        pass: this.configService.get('SMTP_PASS'),
      },
    });
  }

  async sendWelcomeEmail(email: string, name: string) {
    try {
      await this.transporter.sendMail({
        to: email,
        subject: 'Welcome to BraveVest!',
        html: \`
          <h1>Welcome to BraveVest, \${name}!</h1>
          <p>Thank you for joining BraveVest. You're now part of a community of investors building their financial future.</p>
          <p>Get started by completing your profile and exploring investment opportunities.</p>
          <a href="\${this.configService.get('FRONTEND_URL')}/investor/dashboard">Go to Dashboard</a>
        \`,
      });
    } catch (error) {
      console.log('Email error:', error);
    }
  }

  async send2FACode(email: string, code: string) {
    try {
      await this.transporter.sendMail({
        to: email,
        subject: 'Your BraveVest 2FA Code',
        html: \`
          <h1>Your Two-Factor Authentication Code</h1>
          <p>Enter the following code to complete your login:</p>
          <h2 style="font-size: 32px; letter-spacing: 4px;">\${code}</h2>
          <p>This code will expire in 5 minutes.</p>
        \`,
      });
    } catch (error) {
      console.log('Email error:', error);
    }
  }

  async sendPasswordReset(email: string, token: string) {
    try {
      await this.transporter.sendMail({
        to: email,
        subject: 'Reset Your Password - BraveVest',
        html: \`
          <h1>Reset Your Password</h1>
          <p>Click the link below to reset your password:</p>
          <a href="\${this.configService.get('FRONTEND_URL')}/reset-password?token=\${token}">Reset Password</a>
          <p>This link will expire in 1 hour.</p>
        \`,
      });
    } catch (error) {
      console.log('Email error:', error);
    }
  }
}`;

fs.writeFileSync(
  path.join(rootDir, 'apps/api/src/email/email.service.ts'),
  emailService
);
console.log('  ✅ Created: email/');

// ============================================
// 15. CREATE USER MODULE
// ============================================
console.log('\n📄 Creating User module...');

if (!fs.existsSync(path.join(rootDir, 'apps/api/src/user'))) {
  fs.mkdirSync(path.join(rootDir, 'apps/api/src/user'), { recursive: true });
}

const userModule = `// apps/api/src/user/user.module.ts
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}`;

fs.writeFileSync(
  path.join(rootDir, 'apps/api/src/user/user.module.ts'),
  userModule
);

const userController = `// apps/api/src/user/user.controller.ts
import { Controller, Get, UseGuards, Request, Patch, Body } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getCurrentUser(@Request() req) {
    return req.user;
  }

  @Patch('profile')
  @UseGuards(JwtAuthGuard)
  async updateProfile(@Request() req, @Body() updateData: any) {
    return this.userService.updateProfile(req.user.id, updateData);
  }
}`;

fs.writeFileSync(
  path.join(rootDir, 'apps/api/src/user/user.controller.ts'),
  userController
);

const userService = `// apps/api/src/user/user.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        wallets: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async updateProfile(id: string, data: any) {
    const user = await this.prisma.user.update({
      where: { id },
      data,
    });

    return user;
  }

  async getInvestorProfile(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        wallets: true,
        subscriptions: {
          include: {
            opportunity: true,
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}`;

fs.writeFileSync(
  path.join(rootDir, 'apps/api/src/user/user.service.ts'),
  userService
);
console.log('  ✅ Created: user/');

// ============================================
// 16. CREATE .ENV FILE
// ============================================
console.log('\n📄 Creating .env...');

const envFile = `# Database
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/bravevest"

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-me-in-production
JWT_REFRESH_SECRET=your-super-secret-refresh-key-change-me-in-production

# Frontend
FRONTEND_URL=http://localhost:5173

# SMTP (Email)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# API
PORT=3001
NODE_ENV=development

# 2FA
TWO_FACTOR_APP_NAME=BraveVest`;

fs.writeFileSync(
  path.join(rootDir, 'apps/api/.env'),
  envFile
);
console.log('  ✅ Created: .env');

// ============================================
// 17. UPDATE PRISMA SCHEMA
// ============================================
console.log('\n📄 Updating Prisma schema...');

const prismaSchema = `generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id                       String   @id @default(cuid())
  email                    String   @unique
  phone                    String   @unique
  passwordHash             String
  role                     Role     @default(investor)
  accountType              AccountType @default(individual)
  
  // Personal Information
  firstName                String?
  lastName                 String?
  dateOfBirth              DateTime?
  
  // Business Information
  businessName             String?
  businessRegistrationNumber String?
  businessType             String?
  businessIndustry         String?
  businessAddress          String?
  yearsInOperation         Int?
  
  // Profile
  nationality              String?
  countryOfResidence       String?
  investorType             String?
  city                     String?
  address                  String?
  referralCode             String?
  taxId                    String?
  isPEP                    Boolean? @default(false)
  
  // Investment Preferences
  investmentExperience     String?
  riskTolerance            String?
  investmentGoals          String[]
  preferredSectors         String[]
  
  // 2FA
  isTwoFactorEnabled       Boolean  @default(false)
  twoFactorSecret          String?
  
  // KYC
  kycStatus                KycStatus @default(pending)
  kycVerifiedAt            DateTime?
  kycProvider              String?
  
  // Timestamps
  createdAt                DateTime @default(now())
  updatedAt                DateTime @updatedAt
  lastLoginAt              DateTime?
  
  // Relations
  wallets                  Wallet[]
  subscriptions            Subscription[]
  auditLogs                AuditLog[]
  
  @@map("users")
}

model Wallet {
  id                String   @id @default(cuid())
  userId            String
  user              User     @relation(fields: [userId], references: [id])
  balance           Float    @default(0)
  currency          String   @default("NGN")
  updatedAt         DateTime @updatedAt
  
  transactions      WalletTransaction[]
  
  @@map("wallets")
}

model WalletTransaction {
  id                  String   @id @default(cuid())
  walletId            String
  wallet              Wallet   @relation(fields: [walletId], references: [id])
  type                TransactionType
  amount              Float
  reference           String   @unique
  balanceAfter        Float
  relatedEntityType   String?
  relatedEntityId     String?
  metadata            Json?
  createdAt           DateTime @default(now())
  
  @@map("wallet_transactions")
}

model Subscription {
  id                String   @id @default(cuid())
  investorId        String
  investor          User     @relation(fields: [investorId], references: [id])
  opportunityId     String
  units             Int
  amount            Float
  status            SubscriptionStatus @default(pending)
  agreementDocUrl   String?
  subscribedAt      DateTime @default(now())
  updatedAt         DateTime @updatedAt
  
  payouts           Payout[]
  
  @@map("subscriptions")
}

model Payout {
  id                String   @id @default(cuid())
  subscriptionId    String
  subscription      Subscription @relation(fields: [subscriptionId], references: [id])
  scheduledDate     DateTime
  amount            Float
  status            PayoutStatus @default(scheduled)
  paidAt            DateTime?
  transactionRef    String?
  
  @@map("payouts")
}

model AuditLog {
  id                String   @id @default(cuid())
  actorId           String
  actor             User     @relation(fields: [actorId], references: [id])
  action            String
  entity            String
  entityId          String?
  metadata          Json?
  createdAt         DateTime @default(now())
  
  @@map("audit_logs")
}

enum AccountType {
  individual
  business
}

enum Role {
  investor
  borrower
  admin
  committee
  support
}

enum KycStatus {
  pending
  verified
  rejected
}

enum TransactionType {
  deposit
  withdrawal
  subscription
  payout
  fee
}

enum SubscriptionStatus {
  pending
  active
  matured
  defaulted
}

enum PayoutStatus {
  scheduled
  paid
  failed
}`;

fs.writeFileSync(
  path.join(rootDir, 'packages/db/prisma/schema.prisma'),
  prismaSchema
);
console.log('  ✅ Updated: Prisma schema');

// ============================================
// 18. CREATE DECORATORS
// ============================================
console.log('\n📄 Creating decorators...');

if (!fs.existsSync(path.join(rootDir, 'apps/api/src/common/decorators'))) {
  fs.mkdirSync(path.join(rootDir, 'apps/api/src/common/decorators'), { recursive: true });
}

const rolesDecorator = `// apps/api/src/common/decorators/roles.decorator.ts
import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);`;

fs.writeFileSync(
  path.join(rootDir, 'apps/api/src/common/decorators/roles.decorator.ts'),
  rolesDecorator
);
console.log('  ✅ Created: decorators');

console.log('\n✅ API setup complete!');
console.log('\n📋 Next steps:');
console.log('1. cd apps/api');
console.log('2. pnpm install');
console.log('3. pnpm run start:dev');
console.log('\n📌 API Endpoints:');
console.log('   POST   /auth/register    - Register user');
console.log('   POST   /auth/login       - Login user');
console.log('   POST   /auth/2fa/verify  - Verify 2FA');
console.log('   POST   /auth/refresh     - Refresh token');
console.log('   GET    /auth/profile     - Get profile (protected)');
console.log('   POST   /auth/logout      - Logout (protected)');
console.log('   GET    /user/me          - Get current user (protected)');