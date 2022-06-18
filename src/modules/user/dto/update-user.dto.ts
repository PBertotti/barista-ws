import {
  isArray,
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsString()
  @IsDefined()
  @IsOptional()
  name: string;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsString()
  @IsDefined()
  @IsOptional()
  accountStatus: string;
}
