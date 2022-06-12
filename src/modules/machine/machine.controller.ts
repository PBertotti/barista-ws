import { Controller, Delete, Get, Post, Patch, Body } from '@nestjs/common';
import { CreateMachineDto } from './dto/create-machine.dto';
import { MachineService } from './machine.service';

@Controller('machine')
export class MachineController {
  constructor(private readonly machineService: MachineService) {}

  @Get()
  findAll(): string {
    const machines = this.machineService.findAll();
    return machines;
  }

  @Post()
  create(@Body() createMachineDto: CreateMachineDto): string {
    const newMachine = this.machineService.create(createMachineDto);
    return newMachine;
  }

  @Patch()
  update(): string {
    const updatedMachine = this.machineService.update();
    return updatedMachine;
  }

  @Delete()
  delete(): string {
    const deletedMachine = this.machineService.delete();
    return deletedMachine;
  }
}
