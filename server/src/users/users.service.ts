import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User')
    private readonly UserModel: Model<UserDocument>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.UserModel.find().exec();
  }

  async findOne(id: number): Promise<User> {
    return await this.UserModel.findById(id).exec();
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `PATCH request/미구현`;
  }
}
