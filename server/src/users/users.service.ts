import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { Logger } from '@nestjs/common';

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
    Logger.log("CREATE - service.ts");
    const newUser = await new this.UserModel(createUserDto);
    Logger.log("CREATE new usermodel");
    return newUser.save()
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const mode = updateUserDto.data.mode;
    if (mode === 1) { // ADD DIBS
      this.UserModel.findByIdAndUpdate(id, {
        $push: { "productId": updateUserDto.data.productId },
        function(error, success) {
          if (error) {
            console.log("ERROR AT ADD DIBS TO USER," + error)
          } else {
            console.log("SUCCESS TO ADD DIBS TO USER");
          }
        }
      })
    } else if (mode === 2) { // DELETE DIBS
      this.UserModel.findByIdAndUpdate(id, {
        $pull: { "productId": updateUserDto.data.productId },
        function(error, success) {
          if (error) {
            console.log("ERROR AT REMOVE DIBS TO USER," + error)
          } else {
            console.log("SUCCESS TO REMOVE DIBS TO USER");
          }
        }
      })
    }

    return 'test-user';
  }
}
