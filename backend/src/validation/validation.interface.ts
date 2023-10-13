import { IsJSON, IsOptional, IsString } from 'class-validator';

export class ValidationRequestDto {
  @IsString()
  e: string;

  @IsString()
  c: string;

  @IsString()
  encryptedData: string;

  @IsJSON()
  @IsOptional()
  geolocation?: string;
}
