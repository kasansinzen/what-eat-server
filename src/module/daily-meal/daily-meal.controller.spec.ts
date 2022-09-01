import { Test, TestingModule } from '@nestjs/testing';
import { DailyMealController } from './daily-meal.controller';

describe('DailyMealController', () => {
  let controller: DailyMealController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DailyMealController],
    }).compile();

    controller = module.get<DailyMealController>(DailyMealController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
