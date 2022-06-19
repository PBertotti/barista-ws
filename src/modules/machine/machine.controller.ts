import {
  Controller,
  Delete,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Req,
} from '@nestjs/common';
import { CreateMachineDto } from './dto/create-machine.dto';
import { UpdateMachineDto } from './dto/update-machine.dto';
import { MachineService } from './machine.service';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth() // to use swagger bearer token
@Controller('machine')
export class MachineController {
  constructor(private readonly machineService: MachineService) {}

  @Get()
  findAll(@Req() { auth }) {
    const machines = this.machineService.findAll(auth._id);

    return machines;
  }

  @Get(':serialNum')
  findOne(@Param('serialNum') serialNum: string) {
    const machines = this.machineService.findOne(serialNum);

    return machines;
  }

  @Post('add')
  create(@Req() { auth }, @Body() createMachineDto: CreateMachineDto) {
    const newMachine = this.machineService.create(auth._id, createMachineDto);
    return newMachine;
  }

  @Patch()
  update(@Body() updateMachineDto: UpdateMachineDto) {
    const updatedMachine = this.machineService.update(updateMachineDto);

    return updatedMachine;
  }

  @Delete(':serialNum/remove')
  delete(@Req() { auth }, @Param('serialNum') serialNum: string) {
    const deletedMachine = this.machineService.delete(auth._id, serialNum);

    return deletedMachine;
  }
}
