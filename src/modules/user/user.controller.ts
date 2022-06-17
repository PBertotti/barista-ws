import { Controller, Post, Body, Patch } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    const user = this.userService.create(createUserDto);

    return user;
  }

  @Patch()
  updateStatus(@Body() updateUserDto: UpdateUserDto) {
    const updatedUser = this.userService.update(updateUserDto);

    return updatedUser;
  }
}