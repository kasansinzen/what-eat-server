import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DailyMeal } from './entities/daily-meal.entity';
import { DailyMealService } from './daily-meal.service';
import { DailyMealController } from './daily-meal.controller';
import { DailyMealResolver } from './daily-meal.resolver';
import { FoodService } from '@module/food/food.service';
import { FoodModule } from '@module/food/food.module';
import { ResponseService } from '@core/services/http/response/response.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([DailyMeal]),
    FoodModule
  ],
  controllers: [DailyMealController],
  providers: [
    DailyMealService,
    DailyMealResolver,
    ResponseService
  ],

})
export class DailyMealModule {}
