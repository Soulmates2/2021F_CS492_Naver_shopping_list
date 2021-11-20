import { Controller, Get, Param } from '@nestjs/common';
import { ChannelmenusService } from './channelmenus.service';

@Controller('api/channelmenus')
export class ChannelmenusController {
  constructor(private readonly channelmenusService: ChannelmenusService) {}

  @Get()
  findAll() {
    return this.channelmenusService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.channelmenusService.findParentMenu(+id);
  }
}
