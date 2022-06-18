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
      $or: [{ user: createUserDto.user }, { email: createUserDto.email }],
    });

    if (existingUsers.length > 0) {
      // Check if there is another user using this e-mail.
      const emailExists = existingUsers.find(
        (user) => user.email === createUserDto.email,
      );

      throw new PreconditionFailedException(
        emailExists ? 'E-mail already being used' : 'User already exists',
      );
    }

    // Encrypt user password;
    createUserDto.password = await hashString(createUserDto.password);

    const newUser = await this.userModel.create({
      ...createUserDto,
      accountStatus: 'email.inactive',
    });

    return this.filterResults(newUser);
  }

  async update(updateUserDto: UpdateUserDto) {
    const existingUser = await this.userModel.findOne({
      user: updateUserDto.email,
    });

    if (!existingUser) {
      throw new PreconditionFailedException('User does not exist');
    }

    // Update device properties and save document in database.
    existingUser.updatedAt = new Date();

    existingUser.save();

    return this.filterResults(existingUser);
  }
}
