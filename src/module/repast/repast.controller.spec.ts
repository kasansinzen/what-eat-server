import { Test, TestingModule } from '@nestjs/testing';
import { RepastController } from './repast.controller';

describe('RepastController', () => {
  let controller: RepastController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RepastController],
    }).compile();

    controller = module.get<RepastController>(RepastController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
