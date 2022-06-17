import { IsDefined, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @IsDefined()
  user: string;

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
}
