import { createMongoDb } from '@core/utils/createMongoDb';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Food } from './entities/food.entity';
import { FoodService } from './food.service';

const requestSaveFood = new Food("[Unit-Test] KFC");
const requestGetManyFood = [
  new Food("[Unit-Test] KFC-1"),
  new Food("[Unit-Test] KFC-2"),
  new Food("[Unit-Test] KFC-3"),
];

describe('FoodService', () => {
  let service: FoodService;
  let repository: Repository<Food>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FoodService,
        {
          provide: getRepositoryToken(Food),
          useValue: {
            create: jest.fn().mockResolvedValue(requestSaveFood),
            save: jest.fn(),
            find: jest.fn().mockResolvedValue(requestGetManyFood)
          }
        }
      ],
      imports: [
        createMongoDb,
        TypeOrmModule.forFeature([Food])
      ],
    }).compile();

    service = module.get<FoodService>(FoodService);
    repository = module.get<Repository<Food>>(getRepositoryToken(Food));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe("Create Food", () => {
    it('should be create new food', async () => {
      const food = await service.createFood(requestSaveFood);
      expect(food).toEqual(requestSaveFood);
    });
  });

  describe("Get Many Food", () => {
    it('should be get all foods', () => {
      expect(
        service.getMany(requestGetManyFood.map(food => food.id))
      ).resolves.toEqual(requestGetManyFood);
    });
  });
});
