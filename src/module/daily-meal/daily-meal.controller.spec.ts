import { createMongoDb } from '@core/utils/createMongoDb';
import { ResponseService } from '@core/services/http/response/response.service';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DailyMealController } from './daily-meal.controller';
import { DailyMealService } from './daily-meal.service';
import { DailyMeal } from './entities/daily-meal.entity';

describe('DailyMealController', () => {
  let controller: DailyMealController;
  let repository: Repository<DailyMeal>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DailyMealService,
        ResponseService,
        {
          provide: getRepositoryToken(DailyMeal),
          useValue: {
            // create: jest.fn().mockResolvedValue(requestSaveDailyMeal),
            // save: jest.fn()
          }
        },
      ],
      imports: [
        createMongoDb,
        TypeOrmModule.forFeature([DailyMeal])
      ],
      controllers: [DailyMealController],
    }).compile();

    controller = module.get<DailyMealController>(DailyMealController);
    repository = module.get<Repository<DailyMeal>>(getRepositoryToken(DailyMeal));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
