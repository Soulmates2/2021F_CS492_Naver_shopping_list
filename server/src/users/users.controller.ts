import { Controller, Get, Body, Patch, Post, Param, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { Request } from 'express';
import { Logger } from '@nestjs/common';


@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Post()
  // create(@Body() id: string) {
  create(@Body() userData: CreateUserDto) {

    // console.log("CREATE - controller.ts");
    Logger.log("CREATE - controller.ts");
    // Logger.log(id);
    Logger.log(userData);
    Logger.log(userData._id);
    userData.dibs = [];
    Logger.log(userData.dibs);
    Logger.log(userData.dibs.length);
    // userData = CreateUserDto()

    // const value = this.usersService.findOne(userData._id);
    // Logger.log("VALUE");
    // Logger.log(value);

    this.usersService.create(userData);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    Logger.log("Update - controller.ts");
    return this.usersService.update(id, updateUserDto);
  }
}
