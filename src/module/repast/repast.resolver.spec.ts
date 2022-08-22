import { createMongoDb } from '@core/utils/createMongoDb';
import { FoodModule } from '@module/food/food.module';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repast } from './entities/repast.entity';
import { RepastResolver } from './repast.resolver';
import { RepastService } from './repast.service';

describe('RepastResolver', () => {
  let resolver: RepastResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RepastResolver, RepastService],
      imports: [
        createMongoDb,
        TypeOrmModule.forFeature([Repast]),
        FoodModule
      ],
    }).compile();

    resolver = module.get<RepastResolver>(RepastResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
