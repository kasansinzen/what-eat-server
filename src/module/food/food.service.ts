import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Food } from './entities/food.entity';
import { v4 as uuid } from 'uuid';
import { SaveFoodInput } from './dto/save-food.input';

@Injectable()
export class FoodService {

  constructor(
    @InjectRepository(Food) private foodRepository: Repository<Food>
  ) { }

  async createFood(saveFoodInput: SaveFoodInput) {
    const { title } = saveFoodInput;
    const food = this.foodRepository.create({
      id: uuid(),
      title
    });
    await this.foodRepository.save(food);
    return food;
  }

  async getMany(ids: string[]) {
    return this.foodRepository.find({ where: { id: { $in: ids } as any } });
  }
}
