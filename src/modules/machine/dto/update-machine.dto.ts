import { IsDefined, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class MachineStatusDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsDefined()
  waterLevel: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsDefined()
  powderLevel: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsDefined()
  hasRecipient: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsDefined()
  hasFilter: boolean;
}

export class UpdateMachineDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsDefined()
  serialNum: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsDefined()
  model: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDefined()
  status: MachineStatusDTO;
}
