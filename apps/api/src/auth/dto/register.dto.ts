// apps/api/src/auth/dto/register.dto.ts
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
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
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
}