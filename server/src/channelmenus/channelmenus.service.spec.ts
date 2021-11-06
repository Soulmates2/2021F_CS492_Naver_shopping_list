import { Test, TestingModule } from '@nestjs/testing';
import { ChannelmenusService } from './channelmenus.service';

describe('ChannelmenusService', () => {
  let service: ChannelmenusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChannelmenusService],
    }).compile();

    service = module.get<ChannelmenusService>(ChannelmenusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
