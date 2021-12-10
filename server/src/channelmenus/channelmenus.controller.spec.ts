import { Test, TestingModule } from '@nestjs/testing';
import { ChannelmenusController } from './channelmenus.controller';
import { ChannelmenusService } from './channelmenus.service';

describe('ChannelmenusController', () => {
  let controller: ChannelmenusController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChannelmenusController],
      providers: [ChannelmenusService],
    }).compile();

    controller = module.get<ChannelmenusController>(ChannelmenusController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
