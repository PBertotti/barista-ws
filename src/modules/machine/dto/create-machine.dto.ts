import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class CreateMachineDto {
  @IsNotEmpty()
  @IsString()
  @IsDefined()
  serialNum: string;

  @IsNotEmpty()
  @IsString()
  @IsDefined()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsDefined()
  model: string;
}
