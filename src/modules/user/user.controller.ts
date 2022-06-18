import { Controller, Post, Body, Patch, Get, Req } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
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

  @ApiBearerAuth() // to use swagger bearer token
  @Get('profile')
  findOne(@Req() { auth }) {
    const user = this.userService.findOne(auth._id);

    return user;
  }

  @ApiBearerAuth() // to use swagger bearer token
  @Patch('profile')
  updateStatus(@Req() { auth }, @Body() updateUserDto: UpdateUserDto) {
    const updatedUser = this.userService.update(auth._id, updateUserDto);

    return updatedUser;
  }
}
