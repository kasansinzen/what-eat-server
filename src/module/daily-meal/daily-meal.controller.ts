import { ResponseService } from '@core/services/http/response/response.service';
import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { SaveDailyMealInput } from './dto/save-daily-meal.input';
import { DailyMealService } from './daily-meal.service';
import { GetFoodInput } from './dto/get-food.input';
import { GetDailyMealInput } from './dto/get-daily-meal.input';
import { UpdateFoodsDailyMealInput } from './dto/update-foods-daily-meal.input';

@Controller('daily-meal')
export class DailyMealController {

  constructor(
    private dailymMealService: DailyMealService,
    private responseService: ResponseService
  ) { }

  @Get()
  async getDailyMeals(@Query() getDailyMealInput: GetDailyMealInput) {
    return this.responseService.httpResponse({
      result: await this.dailymMealService.getDailyMeals(getDailyMealInput)
    });
  }

  @Get('/foods')
  async getFoods(@Query() getFoodInput: GetFoodInput) {

    return this.responseService.httpResponse({
      result: await this.dailymMealService.getFoods(getFoodInput)
    });
  }

  @Post()
  async saveDailyMeal(@Body() saveDailyMealInput: SaveDailyMealInput) {
    return this.responseService.httpResponse({
      result: await this.dailymMealService.saveDailyMeal(saveDailyMealInput)
    });
  }

  @Patch('/:id')
  async updateFoodsDailyMeal(
    @Param('id') id: string,
    @Body() updateFoodsDailyMealInput: UpdateFoodsDailyMealInput
  ) {
    return this.responseService.httpResponse({
      result: await this.dailymMealService.updateFoodsDailyMeal(id, updateFoodsDailyMealInput)
    });
  }
}
