// apps/api/src/auth/dto/verify-2fa.dto.ts
import { IsString, Length, IsUUID } from 'class-validator';

export class Verify2FADto {
  @IsUUID()
  userId: string;

  @IsString()
  @Length(6, 6)
  code: string;
}