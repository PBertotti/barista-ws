import { IsDefined, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  @IsString()
  @IsDefined()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsString()
  @IsEmail()
  @IsDefined()
  email: string;

  @IsNotEmpty()
  @IsString()
  @IsDefined()
  password: string;

  @IsNotEmpty()
  @IsString()
  @IsDefined()
  accountStatus: string;
}
