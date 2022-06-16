import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class MachineStatusDTO {
  @IsNotEmpty()
  @IsDefined()
  waterLevel: number;

  @IsNotEmpty()
  @IsDefined()
  powderLevel: number;

  @IsNotEmpty()
  @IsDefined()
  hasRecipient: boolean;

  @IsNotEmpty()
  @IsDefined()
  hasFilter: boolean;
}

export class UpdateMachineDto {
  @IsNotEmpty()
  @IsString()
  @IsDefined()
  serialNum: string;

  @IsNotEmpty()
  @IsString()
  @IsDefined()
  model: string;

  @IsNotEmpty()
  @IsDefined()
  status: MachineStatusDTO;
}
