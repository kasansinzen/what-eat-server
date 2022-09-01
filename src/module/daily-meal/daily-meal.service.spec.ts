import { createMongoDb } from '@core/utils/createMongoDb';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DailyMeal } from './entities/daily-meal.entity';
import { DailyMealService } from './daily-meal.service';

const requestSaveDailyMeal = new DailyMeal()

describe('DailyMealService', () => {
  let service: DailyMealService;
  let repository: Repository<DailyMeal>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DailyMealService,
        {
          provide: getRepositoryToken(DailyMeal),
          useValue: {
            create: jest.fn().mockResolvedValue(requestSaveDailyMeal),
            save: jest.fn()
          }
        },
      ],
      imports: [
        createMongoDb,
        TypeOrmModule.forFeature([DailyMeal])
      ],
    }).compile();

    service = module.get<DailyMealService>(DailyMealService);
    repository = module.get<Repository<DailyMeal>>(getRepositoryToken(DailyMeal));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Create DailyMeal', () => {
    it('should be create new daily meal', () => {
      expect(service.createDailyMeal(requestSaveDailyMeal)).resolves.toEqual(requestSaveDailyMeal);
    });
  });
});
