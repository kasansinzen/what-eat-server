import { createMongoDb } from '@core/utils/createMongoDb';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Food } from './entities/food.entity';
import { FoodService } from './food.service';

describe('FoodService', () => {
  let service: FoodService;
  let lastFoodId: string = "";

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FoodService],
      imports: [
        createMongoDb,
        TypeOrmModule.forFeature([Food])
      ],
    }).compile();

    service = module.get<FoodService>(FoodService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be create new food', async () => {
    const food = await service.createFood("[Unit-Test] KFC");
    lastFoodId = food.id;
    
    expect(food).not.toBeUndefined();
    expect(food).toHaveProperty('id');
    expect(food).toHaveProperty('title');
  })

  it('should be get all foods', async () => {
    const foods = await service.getMany([lastFoodId]);
    expect(foods).toHaveLength(1);
  });

  it('should be get empty foods', async () => {
    const foods = await service.getMany([]);
    expect(foods).toHaveLength(0);
  });
});
