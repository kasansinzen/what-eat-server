import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Food } from './entities/food.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class FoodService {

  constructor(
    @InjectRepository(Food) private foodRepository: Repository<Food>
  ) { }

  createFood(title: string) {
    const food = this.foodRepository.create({
      id: uuid(),
      title
    });

    return this.foodRepository.save(food);
  }

  async getMany(ids: string[]) {
    return this.foodRepository.find({ where: { id: { $in: ids } as any } });
  }
}
