import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Menu, MenuDocument } from './schemas/menu.schema';

@Injectable()
export class MenusService {
  constructor(
    @InjectModel('Menu')
    private readonly MenuModel: Model<MenuDocument>,
  ) {}

  async findAll(): Promise<Menu[]> {
    return await this.MenuModel.find().exec();
  }

  async findOne(id: number) {
    return await this.MenuModel.findById(id).exec();
  }
}
