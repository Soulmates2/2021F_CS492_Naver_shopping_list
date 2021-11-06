import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Channel, ChannelDocument } from './schemas/channel.schema';

@Injectable()
export class ChannelsService {
  constructor(
    @InjectModel('Channel')
    private readonly ChannelModel: Model<ChannelDocument>,
  ) {}

  async findAll(): Promise<Channel[]> {
    return await this.ChannelModel.find().exec();
  }

  async findOne(id: number) {
    return await this.ChannelModel.findById(id).exec();
  }
}
