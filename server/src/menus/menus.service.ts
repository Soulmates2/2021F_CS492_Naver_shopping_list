import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Menu, MenuDocument } from './schemas/menu.schema';

@Injectable()
export class MenusService {
  private parents;
  constructor(
    @InjectModel('Menu')
    private readonly MenuModel: Model<MenuDocument>,
  ) {
    this.parents = this.findParents();
  }

  async findAll(): Promise<Menu[]> {
    return await this.MenuModel.find().exec();
  }

  async findParents() {
    return await this.MenuModel.find({ parentId: '0' }).exec();
  }

  async findOne(id: string) {
    const parents = await this.parents;

    return parents.find((menu) => {
      if (menu._id === id) {
        return menu;
      }
    });
  }

  async findChildmenus(pid: string) {
    return await this.MenuModel.find({ parentId: pid }).exec();
  }
}
