import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChannelMenu, ChannelMenuDocument } from './schemas/channelmenu.schema';

@Injectable()
export class ChannelmenusService {
  constructor(
    @InjectModel('ChannelMenus')
    private readonly ChannelMenuModel: Model<ChannelMenuDocument>,
  ) {}

  async findAll(): Promise<ChannelMenu[]> {
    return await this.ChannelMenuModel.find().exec();
  }

  async findOne(id: number) {
    return await this.ChannelMenuModel.findById(id).exec();
  }
}
