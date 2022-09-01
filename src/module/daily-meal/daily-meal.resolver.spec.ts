import { createMongoDb } from '@core/utils/createMongoDb';
import { FoodModule } from '@module/food/food.module';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DailyMeal } from './entities/daily-meal.entity';
import { DailyMealResolver } from './daily-meal.resolver';
import { DailyMealService } from './daily-meal.service';

describe('DailyMealResolver', () => {
  let resolver: DailyMealResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DailyMealResolver, DailyMealService],
      imports: [
        createMongoDb,
        TypeOrmModule.forFeature([DailyMeal]),
        FoodModule
      ],
    }).compile();

    resolver = module.get<DailyMealResolver>(DailyMealResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
