import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Food } from './food.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class FoodService {

  constructor(
    @InjectRepository(Food) private foodRepository: Repository<Food>
  ) { }

  getHelloFood(): string {
    return "Hello Food";
  }

  createFood(title: string) {
    const food = this.foodRepository.create({
      id: uuid(),
      title
    });

    return this.foodRepository.save(food);
  }
}
