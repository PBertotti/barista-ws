import { Injectable, PreconditionFailedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMachineDto } from './dto/create-machine.dto';
import { UpdateMachineDto } from './dto/update-machine.dto';

import { Machine, MachineDocument } from './machine.schema';

@Injectable()
export class MachineService {
  constructor(
    @InjectModel(Machine.name) private machineModel: Model<MachineDocument>,
  ) {}

  filterResults(result: any) {
    const res = JSON.parse(JSON.stringify(result));
    delete res.__v;

    return res;
  }

  async findAll() {
    const machineList = await this.machineModel.find({}, { __v: 0 });

    return machineList;
  }

  async findOne(serialNum: string) {
    const machine = await this.machineModel.findOne(
      { serialNum: serialNum },
      { __v: 0 },
    );

    return machine;
  }

  async create(createMachineDto: CreateMachineDto) {
    const existingMachines = await this.machineModel.count({
      serialNum: createMachineDto.serialNum,
    });

    if (existingMachines > 0) {
      throw new PreconditionFailedException('Machine already exists');
    }

    const newMachine = await this.machineModel.create({
      ...createMachineDto,
    });

    return this.filterResults(newMachine);
  }

  async update(updateMachineDto: UpdateMachineDto) {
    const existingMachine = await this.machineModel.findOne({
      serialNum: updateMachineDto.serialNum,
    });

    if (!existingMachine) {
      throw new PreconditionFailedException('Machine does not exist');
    }

    // Update device properties and save document in database.
    existingMachine.status = updateMachineDto.status;
    existingMachine.updatedAt = new Date();

    existingMachine.save();

    return this.filterResults(existingMachine);
  }

  async delete(serialNum: string) {
    const existingMachine = await this.machineModel.findOne({
      serialNum: serialNum,
    });

    if (!existingMachine) {
      throw new PreconditionFailedException('Machine does not exist');
    }

    // Update device properties and save document in database.
    existingMachine.deletedAt = new Date();
    existingMachine.remove();

    return this.filterResults(existingMachine);
  }
}
