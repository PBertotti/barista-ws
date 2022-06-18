import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsString,
  IsOptional,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AccessDTO {
  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsString()
  @IsDefined()
  @IsOptional()
  user: string;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsString()
  @IsString()
  @IsEmail()
  @IsDefined()
  @IsOptional()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsDefined()
  password: string;
}
