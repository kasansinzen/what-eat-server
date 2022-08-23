import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Food } from './entities/food.entity';
import { v4 as uuid } from 'uuid';
import { SaveFoodInput } from './dto/save-food.input';
import { SearchFoodInput } from './dto/search-food.input';

@Injectable()
export class FoodService {

  constructor(
    @InjectRepository(Food) private foodRepository: Repository<Food>
  ) { }

  getFoods(): Promise<Food[]> {
    return this.foodRepository.find();
  }

  searchFodds(searchFoodInput: SearchFoodInput): Promise<Food[]> {
    const { keyword, limit, offset } = searchFoodInput;
    const newLimit = limit || 20;
    const newOffset = offset || 0;

    return this.foodRepository.find();
  }

  async createFood(saveFoodInput: SaveFoodInput): Promise<Food> {
    const { title } = saveFoodInput;
    const food = this.foodRepository.create({
      id: uuid(),
      title
    });
    await this.foodRepository.save(food);
    return food;
  }

  async getMany(ids: string[]): Promise<Food[]> {
    return this.foodRepository.find({ where: { id: { $in: ids } as any } });
  }
}
