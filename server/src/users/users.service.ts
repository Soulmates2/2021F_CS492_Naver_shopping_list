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
    const user = await this.UserModel.findById(createUserDto._id).exec();
    if(user!=null){
      console.log("id== %s", createUserDto._id);
      console.log("id is already in db: %s", user);
      return;
    }
    // if ((await this.UserModel.findOne({ _id: createUserDto._id }))) {
      // throw new ConflictException();
    console.log("id not in db save it");
    createUserDto.dibs = [];
    const newUser = await new this.UserModel(createUserDto);
    return newUser.save();
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.UserModel.findById(id).exec();
    if(user==null){
      console.log("no user");
    } else{
      console.log("user found successful");
    }
    if(updateUserDto.data.mode == 2){
      if(user.dibs.length != 0){
        const i = user.dibs.findIndex(element => element === updateUserDto.data.productId);
        user.dibs.splice(i, 1);
      }
    }else if(updateUserDto.data.mode == 1){
      user.dibs.push(updateUserDto.data.productId);
      console.log("addtoDib");
    }

    const post = await this.UserModel.findByIdAndUpdate(id, {
      dibs: user.dibs,
    });
    console.log("updated successfully: "+user.dibs);
    return 'test';
  }

  async findAllDibs(id: string): Promise<String[]> {
    const user = await this.UserModel.findById(id).exec();
    console.log("return all dibs: "+user.dibs);
    return user.dibs;
  }
}
