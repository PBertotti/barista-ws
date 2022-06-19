import { Injectable, PreconditionFailedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { throws } from 'assert';
import { Model } from 'mongoose';
import { User, UserDocument } from '../user/user.schema';
import { CreateMachineDto } from './dto/create-machine.dto';
import { UpdateMachineDto } from './dto/update-machine.dto';

import { Machine, MachineDocument } from './machine.schema';

@Injectable()
export class MachineService {
  constructor(
    @InjectModel(Machine.name) private machineModel: Model<MachineDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  filterResults(result: any) {
    const res = JSON.parse(JSON.stringify(result));
    delete res.__v;

    return res;
  }

  async findAll(userID: string) {
    // Get user machine list;
    const user = await this.userModel.findOne({ _id: userID });
    if (!user) {
      throw new PreconditionFailedException('User does not exists');
    }

    const machineList = await this.machineModel.find(
      { serialNum: user.machines },
      {
        __v: 0,
      },
    );

    return machineList;
  }

  async findOne(serialNum: string) {
    const machine = await this.machineModel.findOne(
      { serialNum: serialNum },
      { __v: 0 },
    );

    return machine;
  }

  async create(userID: string, createMachineDto: CreateMachineDto) {
    // Check if machine already exists;
    let isNewMachine = false;
    let machine = await this.machineModel.findOne({
      serialNum: createMachineDto.serialNum,
    });

    if (!machine) {
      // In case the machine doesn't exits, create a new machine.
      isNewMachine = true;

      machine = await this.machineModel.create({
        ...createMachineDto,
      });
    }

    // Add machine to the user's machine list;
    const user = await this.userModel.findOne({ _id: userID });

    if (!user) {
      throw new PreconditionFailedException('User does not exist');
    }

    user.machines.push(machine.serialNum);
    user.save();

    return {
      user: { machines: user.machines },
      machine: this.filterResults(machine),
      isNewMachine: isNewMachine,
    };
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

  async delete(userID, serialNum: string) {
    // Remove machine from the user's machine list;
    const user = await this.userModel.findOne({ _id: userID });

    if (!user) {
      throw new PreconditionFailedException('User does not exist');
    }

    const machineIndex = user.machines.findIndex(
      (machineSerial) => serialNum === machineSerial,
    );

    if (machineIndex === -1) {
      throw new PreconditionFailedException('User does not have this machine');
    }

    user.machines.splice(machineIndex, 1);

    user.save();

    return this.filterResults({ user: { machines: user.machines } });
  }
}
