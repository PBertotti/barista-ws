import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMachineDto } from './dto/create-machine.dto';
import { Machine, MachineDocument } from './machine.schema';

@Injectable()
export class MachineService {
  constructor(
    @InjectModel(Machine.name) private machineModel: Model<MachineDocument>,
  ) {}

  findAll(): string {
    return 'List!!';
  }

  create(createMachineDto: CreateMachineDto): string {
    console.log(createMachineDto);
    this.machineModel.create({ ...createMachineDto });
    return 'Created!';
  }

  update(): string {
    return 'Updated!';
  }

  delete(): string {
    return 'Deleted!';
  }
}
