import { Test, TestingModule } from '@nestjs/testing';
import { RepastService } from './repast.service';

describe('RepastService', () => {
  let service: RepastService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RepastService],
    }).compile();

    service = module.get<RepastService>(RepastService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
