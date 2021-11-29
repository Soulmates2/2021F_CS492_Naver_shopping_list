import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { ConflictException } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User')
    private readonly UserModel: Model<UserDocument>,
  ) { }

  async findAll(): Promise<User[]> {
    return await this.UserModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    return await this.UserModel.findById(id).exec();
  }

  async create(createUserDto: CreateUserDto) {
    if ((await this.UserModel.findOne({ _id: createUserDto._id }))) {
      throw new ConflictException();
    }
    const newUser = await new this.UserModel(createUserDto);
    return newUser.save();
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return 'test-user';
  }
}
