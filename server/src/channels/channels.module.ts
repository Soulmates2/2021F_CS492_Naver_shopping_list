import { Module } from '@nestjs/common';
import { ChannelsService } from './channels.service';
import { ChannelsController } from './channels.controller';
import { MongooseModule } from '@nestjs/mongoose'; // add this
import { ChannelSchema } from './schemas/channel.schema'; // and this

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Channel', schema: ChannelSchema, collection: 'Channel' },
    ]),
  ],
  controllers: [ChannelsController],
  providers: [ChannelsService],
})
export class ChannelsModule {}
