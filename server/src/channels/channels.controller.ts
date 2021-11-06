import { Controller, Get, Param } from '@nestjs/common';
import { ChannelsService } from './channels.service';

@Controller('api/channels')
export class ChannelsController {
  constructor(private readonly channelsService: ChannelsService) {}

  @Get()
  async findAll() {
    return this.channelsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.channelsService.findOne(+id);
  }
}
