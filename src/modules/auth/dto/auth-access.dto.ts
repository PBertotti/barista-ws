import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsString,
  IsOptional,
} from 'class-validator';

export class AccessDTO {
  @IsNotEmpty()
  @IsString()
  @IsDefined()
  @IsOptional()
  user: string;

  @IsNotEmpty()
  @IsString()
  @IsString()
  @IsEmail()
  @IsDefined()
  @IsOptional()
  email: string;

  @IsNotEmpty()
  @IsString()
  @IsDefined()
  password: string;
}
