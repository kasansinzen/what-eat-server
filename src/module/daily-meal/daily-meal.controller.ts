import { ResponseService } from '@core/services/http/response/response.service';
import { Body, Controller, Post } from '@nestjs/common';
import { SaveDailyMealInput } from './dto/save-daily-meal.input';
import { DailyMealService } from './daily-meal.service';

@Controller('daily-meal')
export class DailyMealController {

  constructor(
    private dailymMealService: DailyMealService,
    private responseService: ResponseService
  ) { }

  @Post()
  async createDailyMeal(@Body() saveDailyMealInput: SaveDailyMealInput) {
    return this.responseService.httpResponse({
      result: await this.dailymMealService.createDailyMeal2(saveDailyMealInput)
    });
  }
}
