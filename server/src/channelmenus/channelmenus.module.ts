import { Module } from '@nestjs/common';
import { ChannelmenusService } from './channelmenus.service';
import { ChannelmenusController } from './channelmenus.controller';
import { MongooseModule } from '@nestjs/mongoose'; // add this
import { ChannelMenuSchema } from './schemas/channelmenu.schema'; // and this

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'ChannelMenus',
        schema: ChannelMenuSchema,
        collection: 'ChannelMenus',
      },
    ]),
  ],
  controllers: [ChannelmenusController],
  providers: [ChannelmenusService],
})
export class ChannelmenusModule {}
