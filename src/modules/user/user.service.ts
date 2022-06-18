import { Injectable, PreconditionFailedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { hashString } from 'src/core/helpers/functions/string';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  filterResults(result: any) {
    const res = JSON.parse(JSON.stringify(result));
    delete res.__v;
    delete res.password;

    return res;
  }

  async create(createUserDto: CreateUserDto) {
    const existingUsers = await this.userModel.find({
      email: createUserDto.email,
    });

    if (existingUsers.length > 0) {
      throw new PreconditionFailedException('User already exists');
    }

    // Encrypt user password;
    createUserDto.password = await hashString(createUserDto.password);

    const newUser = await this.userModel.create({
      ...createUserDto,
      accountStatus: 'email.inactive',
    });

    return this.filterResults(newUser);
  }

  async findOne(userID) {
    const existingUser = await this.userModel.findOne({
      _id: userID,
    });

    if (!existingUser) {
      throw new PreconditionFailedException('User does not exist');
    }

    return this.filterResults(existingUser);
  }

  async update(userID, updateUserDto: UpdateUserDto) {
    const existingUser = await this.userModel.findOne({
      _id: userID,
    });

    if (!existingUser) {
      throw new PreconditionFailedException('User does not exist');
    }

    // Update device properties and save document in database.
    [...Object.keys(updateUserDto)].forEach((key) => {
      existingUser[key] = updateUserDto[key];
    });

    existingUser.updatedAt = new Date();

    existingUser.save();

    return this.filterResults(existingUser);
  }
}
