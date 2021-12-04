import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChannelMenu, ChannelMenuDocument } from './schemas/channelmenu.schema';
import { MenusService } from 'src/menus/menus.service';

@Injectable()
export class ChannelmenusService {
  constructor(
    @InjectModel('ChannelMenus')
    private readonly ChannelMenuModel: Model<ChannelMenuDocument>,
    private menusService: MenusService,
  ) {}

  async findAll(): Promise<ChannelMenu[]> {
    return await this.ChannelMenuModel.find().exec();
  }

  async findParentMenu(id: number) {
    const menuIdList = await this.ChannelMenuModel.findById(id).exec();
    let pmenuList = [];
    if (menuIdList === null) {
      return pmenuList;
    }
    for (const menuId of menuIdList.menus) {
      const menu = await this.menusService.findOne(menuId);
      if (menu) {
        pmenuList.push(menu);
      }
    }

    return pmenuList;
  }
}
