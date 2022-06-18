import { IsDefined, IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsDefined()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsString()
  @IsEmail()
  @IsDefined()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsDefined()
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsDefined()
  accountStatus: string;
}
