import { IsDefined, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateMachineDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsDefined()
  serialNum: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsString()
  @IsDefined()
  model: string;
}
