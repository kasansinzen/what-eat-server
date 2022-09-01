import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { DailyMeal } from './entities/daily-meal.entity';
import { v4 as uuid} from 'uuid';
import { SaveDailyMealInput } from './dto/save-daily-meal.input';
import { FoodService } from '@module/food/food.service';

@Injectable()
export class DailyMealService {

  constructor(
    @InjectRepository(DailyMeal) private dailyMealRepository: MongoRepository<DailyMeal>,
    private foodService: FoodService,
  ) { }

  getDailyMeal() {
    return this.dailyMealRepository.find();
  }

  async createDailyMeal(saveDailyMealInput: SaveDailyMealInput) {
    const {foods, mealStatus, sheduleDate} = saveDailyMealInput;
    const dailyMeal = this.dailyMealRepository.create({
      id: uuid(),
      foods,
      sheduleDate,
      mealStatus
    });
    await this.dailyMealRepository.save(dailyMeal);
    return dailyMeal;
  }

  async createDailyMeal2(saveDailyMealInput: SaveDailyMealInput) {
    const {foods} = saveDailyMealInput;
    const foodsExist = await this.foodService.getFoodsByForceExist(foods.map(title => ({title})));
    const dailyMeal = await this.createDailyMeal({
      ...saveDailyMealInput,
      foods: foodsExist.map(food => food.id)
    });

    return dailyMeal;
  }
}
