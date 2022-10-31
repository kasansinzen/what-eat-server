import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DailyMeal } from './entities/daily-meal.entity';
import { DailyMealService } from './daily-meal.service';
import { DailyMealController } from './daily-meal.controller';
import { DailyMealResolver } from './daily-meal.resolver';
import { ResponseService } from '@core/services/http/response/response.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([DailyMeal]),
  ],
  controllers: [DailyMealController],
  providers: [
    DailyMealService,
    DailyMealResolver,
    ResponseService
  ],

})
export class DailyMealModule {}
