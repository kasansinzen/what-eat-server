import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, MongoRepository, Repository } from 'typeorm';
import { Food } from './entities/food.entity';
import { v4 as uuid } from 'uuid';
import { SaveFoodInput } from './dto/save-food.input';
import { SearchFoodInput } from './dto/search-food.input';
import { ResponseService } from '@core/services/http/response/response.service';

@Injectable()
export class FoodService {

  constructor(
    @InjectRepository(Food) private foodRepository: MongoRepository<Food>,
    private responseService: ResponseService,
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

  async updateFood(id: string, saveFoodInput: SaveFoodInput): Promise<Food> {
    if(!id) throw new HttpException("ID is required", this.responseService.httpStatusCode('noContent'));

    const food = await this.foodRepository.findOneOrFail({where: {id}});

    const { title } = saveFoodInput;
    food.title = title;
    await this.foodRepository.save(food);

    return food;
  }

  async getFoodByForceExist(saveFoodInput: SaveFoodInput): Promise<Food> {
    const { title } = saveFoodInput;
    let food = await this.foodRepository.findOne({where: {title}});
    if(!food) await this.createFood(saveFoodInput);

    return food;
  }

  async getFoodsByForceExist(saveFoodInput: SaveFoodInput[]): Promise<Food[]> {
    const titles = saveFoodInput.map(input => input.title);
    const foods = await this.foodRepository.find({where: {title: {$in: titles}} as any})
    const newFoods = await Promise.all(titles.filter(title => !foods.map(food => food.title).includes(title)).map(title => this.createFood({title})));

    return [...foods, ...newFoods];
  }

  async getMany(ids: string[]): Promise<Food[]> {
    return this.foodRepository.find({ where: {id: {$in: ids}} } as any);
  }
}
