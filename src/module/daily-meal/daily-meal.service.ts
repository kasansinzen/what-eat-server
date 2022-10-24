import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { DailyMeal } from './entities/daily-meal.entity';
import { v4 as uuid} from 'uuid';
import { SaveDailyMealInput } from './dto/save-daily-meal.input';
import { GetFoodInput } from './dto/get-food.input';
import { GetDailyMealInput } from './dto/get-daily-meal.input';
import { UpdateFoodsDailyMealInput } from './dto/update-foods-daily-meal.input';

@Injectable()
export class DailyMealService {

  constructor(
    @InjectRepository(DailyMeal) private dailyMealRepository: MongoRepository<DailyMeal>,
  ) { }

  async getDailyMeals(getDailyMealInput: GetDailyMealInput) {
    const {scheduleDate} = getDailyMealInput ?? {};
    let criteria = {};
    if(scheduleDate) criteria = {...criteria, scheduleDate: new Date(scheduleDate)};
    
    return this.dailyMealRepository.find({where: criteria});
  }

  async getFoods(getFoodInput: GetFoodInput) {
    const {keyword} = getFoodInput;
    const dailyMeals = await this.dailyMealRepository.find({where: {foods: {$regex: keyword || ""}}} as any);
    const foods: string[] = [];
    dailyMeals.forEach(dailyMeal => {
      dailyMeal.foods.forEach(food => foods.push(food));
    });

    return foods.filter((food, index) => foods.indexOf(food) === index);
  }

  async createDailyMeal(saveDailyMealInput: SaveDailyMealInput) {
    const dailyMeal = new DailyMeal();
    dailyMeal.id = uuid();
    dailyMeal.scheduleDate = new Date(saveDailyMealInput.scheduleDate);
    dailyMeal.mealStatus = saveDailyMealInput.mealStatus;
    dailyMeal.foods = saveDailyMealInput.foods;

    await this.dailyMealRepository.save(dailyMeal);
    return dailyMeal;
  }

  async editDailyMeal(id: string, saveDailyMealInput: SaveDailyMealInput) {
    const dailyMeal = await this.dailyMealRepository.findOne({where: {id}});
    if(!dailyMeal) throw new NotFoundException(`Daily Meal notfound by id ${id}`);

    dailyMeal.scheduleDate = new Date(saveDailyMealInput.scheduleDate);
    dailyMeal.mealStatus = saveDailyMealInput.mealStatus;
    dailyMeal.foods = saveDailyMealInput.foods;

    await this.dailyMealRepository.save(dailyMeal);
    return dailyMeal;
  }

  async updateFoodsDailyMeal(id: string, updateFoodsDailyMealInput: UpdateFoodsDailyMealInput) {
    const dailyMeal = await this.dailyMealRepository.findOne({where: {id}});
    if(!dailyMeal) throw new NotFoundException(`Daily Meal notfound by id ${id}`);

    const {foods} = updateFoodsDailyMealInput;
    dailyMeal.foods = [...dailyMeal.foods, ...foods];

    await this.dailyMealRepository.save(dailyMeal);
    return dailyMeal;
  }

  async saveDailyMeal(saveDailyMealInput: SaveDailyMealInput) {
    const {foods, scheduleDate, mealStatus} = saveDailyMealInput;
    const findDailyMeal = await this.dailyMealRepository.findOne({where: {
      scheduleDate: new Date(scheduleDate),
      mealStatus
    }});
    
    if(findDailyMeal) return await this.updateFoodsDailyMeal(findDailyMeal.id, {foods});
    else return await this.createDailyMeal(saveDailyMealInput);
  }
}
