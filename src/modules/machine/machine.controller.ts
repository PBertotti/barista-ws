import {
  Controller,
  Delete,
  Get,
  Post,
  Patch,
  Body,
  Param,
} from '@nestjs/common';
import { CreateMachineDto } from './dto/create-machine.dto';
import { UpdateMachineDto } from './dto/update-machine.dto';
import { MachineService } from './machine.service';

@Controller('machine')
export class MachineController {
  constructor(private readonly machineService: MachineService) {}

  @Get()
  findAll() {
    const machines = this.machineService.findAll();

    return machines;
  }

  @Get(':serialNum')
  findOne(@Param('serialNum') serialNum: string) {
    const machines = this.machineService.findOne(serialNum);

    return machines;
  }

  @Post()
  create(@Body() createMachineDto: CreateMachineDto) {
    const newMachine = this.machineService.create(createMachineDto);
    return newMachine;
  }

  @Patch()
  update(@Body() updateMachineDto: UpdateMachineDto) {
    const updatedMachine = this.machineService.update(updateMachineDto);

    return updatedMachine;
  }

  @Delete(':serialNum')
  delete(@Param('serialNum') serialNum: string) {
    const deletedMachine = this.machineService.delete(serialNum);

    return deletedMachine;
  }
}
