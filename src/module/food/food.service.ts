import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, MongoRepository, Repository } from 'typeorm';
import { Food } from './entities/food.entity';
import { v4 as uuid } from 'uuid';
import { SaveFoodInput } from './dto/save-food.input';
import { SearchFoodInput } from './dto/search-food.input';

@Injectable()
export class FoodService {

  constructor(
    @InjectRepository(Food) private foodRepository: MongoRepository<Food>
  ) { }

  getFoods(): Promise<Food[]> {
    return this.foodRepository.find();
  }

  searchFoods(searchFoodInput: SearchFoodInput): Promise<Food[]> {
    const { keyword, limit, offset } = searchFoodInput;

    const newKeyword = keyword || "";
    const newLimit = limit || 20;
    const newOffset = offset || 0;

    return this.foodRepository.find({where: {title: {$regex: newKeyword}}, limit: newLimit, offset: newOffset} as any);
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
    return this.foodRepository.find({ where: {id: {$in: ids}} } as any);
  }
}
