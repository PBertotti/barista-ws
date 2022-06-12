import { Module } from '@nestjs/common';
import { MachineController } from './machine.controller';
import { MachineSchemaDefinition } from './machine.schema';
import { MachineService } from './machine.service';

@Module({
  imports: [MachineModule, MachineSchemaDefinition],
  controllers: [MachineController],
  providers: [MachineService],
  exports: [MachineService, MachineSchemaDefinition],
})
export class MachineModule {}
