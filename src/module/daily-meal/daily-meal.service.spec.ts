import { createMongoDb } from '@core/utils/createMongoDb';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DailyMeal } from './entities/daily-meal.entity';
import { DailyMealService } from './daily-meal.service';
import { MealStatus } from './daily-meal.enum';

describe('DailyMealService', () => {
  let service: DailyMealService;
  let repository: jest.Mocked<Repository<DailyMeal>>;
  const mockDailyMeals: DailyMeal[] = new Array(5).fill(new DailyMeal([`KFC`], new Date(), MealStatus.BREAKFAST));
  const newFoods = ['Papaya Salad', 'Pizza'];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DailyMealService,
        {
          provide: getRepositoryToken(DailyMeal),
          useFactory: () => ({
            find: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn()
          })
        },
      ]
    }).compile();

    service = module.get<DailyMealService>(DailyMealService);
    repository = module.get(getRepositoryToken(DailyMeal));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getDailyMeals', () => {
    it('should get daily meals', async () => {
      repository.find.mockResolvedValue(mockDailyMeals);
      const dailyMeal = await service.getDailyMeals({});
      expect(dailyMeal).toEqual(mockDailyMeals);
    });
  });

  describe('getFoods', () => {
    it('should get foods', async () => {
      repository.find.mockResolvedValue(mockDailyMeals);
      const foods = await service.getFoods({keyword: "KFC", limit: 10, offset: 0});
      expect(foods).toHaveLength(1);
    });
  });
  

  describe('createDailyMeal', () => {
    it('should create new daily meal', async () => {
      repository.save.mockResolvedValue(mockDailyMeals[0]);
      const create = await service.createDailyMeal(mockDailyMeals[0]);
      expect(create).toHaveProperty('id');
      expect(create).toEqual({...mockDailyMeals[0], id: create.id});
    });
  });

  describe('editDailyMeal', () => {
    it('should edit daily meal', async () => {
      repository.save.mockResolvedValue(mockDailyMeals[0]);
      repository.findOne.mockResolvedValue(mockDailyMeals[0]);

      const create = await service.createDailyMeal(mockDailyMeals[0]);
      const mockDailyEdit: DailyMeal = {...mockDailyMeals[0], mealStatus: MealStatus.LUNCH};
      const edit = await service.editDailyMeal(create.id, mockDailyEdit);
      
      expect(edit.mealStatus).toEqual(MealStatus.LUNCH);
      expect(edit).toEqual(mockDailyEdit);
    });
  });

  describe('updateFoodsDailyMeal', () => {
    it('should update foods of daily meal as increase', async () => {
      repository.save.mockResolvedValue(mockDailyMeals[0]);
      repository.findOne.mockResolvedValue(mockDailyMeals[0]);

      const create = await service.createDailyMeal(mockDailyMeals[0]);
      const update = await service.updateFoodsDailyMeal(create.id, {foods: newFoods});

      expect(update.foods).toHaveLength(create.foods.length + newFoods.length);
      expect(newFoods.every(food => update.foods.includes(food))).toBe(true);
    });
  });

  describe('saveDailyMeal', () => {
    it('should save an create if data is not exist', async () => {
      repository.save.mockResolvedValue(mockDailyMeals[0]);
      const save = await service.saveDailyMeal(mockDailyMeals[0]);

      expect(save).toHaveProperty('id');
      expect(save).toEqual({...mockDailyMeals[0], id: save.id});
    });

    // it('should save an update if data is exist', async () => {
    //   repository.save.mockResolvedValue(mockDailyMeals[0]);
    //   console.log('mockDailyMeals[0]', mockDailyMeals[0]);
    //   const saveCreate = await service.saveDailyMeal(mockDailyMeals[0]);
    //   const saveUpdate = await service.saveDailyMeal({...mockDailyMeals[0], foods: newFoods});
    //   console.log('saveCreate', saveCreate);
    //   console.log('saveUpdate', saveUpdate);
    //   expect(saveUpdate.foods).toHaveLength(mockDailyMeals[0].foods.length + newFoods.length);
    //   expect(newFoods.every(food => saveUpdate.foods.includes(food))).toBe(true);
    // });
  });
});
