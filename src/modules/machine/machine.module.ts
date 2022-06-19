import { Module } from '@nestjs/common';
import { UserSchemaDefinition } from '../user/user.schema';
import { MachineController } from './machine.controller';
import { MachineSchemaDefinition } from './machine.schema';
import { MachineService } from './machine.service';

@Module({
  imports: [MachineModule, MachineSchemaDefinition, UserSchemaDefinition],
  controllers: [MachineController],
  providers: [MachineService],
  exports: [MachineService, MachineSchemaDefinition],
})
export class MachineModule {}
