import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChannelsModule } from './channels/channels.module';
import { ChannelmenusModule } from './channelmenus/channelmenus.module';
import { MenusModule } from './menus/menus.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://admin:naver123@cluster0.da5up.mongodb.net/shopping',
    ),
    ChannelsModule,
    ChannelmenusModule,
    MenusModule,
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
