import { Args, Mutation, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { DailyMealService } from './daily-meal.service';
import { DailyMealModel } from './models/daily-meal.model';
import { FoodModel } from '@module/food/models/food.type';
import { FoodService } from '@module/food/food.service';
import { SaveDailyMealInput } from './dto/save-daily-meal.input';

@Resolver(of => DailyMealModel)
export class DailyMealResolver {
	constructor(
		private dailyMealService: DailyMealService,
		private foodService: FoodService,
	) { }

	@Mutation(returns => DailyMealModel)
	createDailyMeal(@Args('saveDailyMealInput') saveDailyMealInput: SaveDailyMealInput) {
		return this.dailyMealService.createDailyMeal2(saveDailyMealInput);
	}

	@ResolveField('foods', returns => [FoodModel])
	async foods(@Parent() dailyMeal: DailyMealModel) {
		return this.foodService.getMany(dailyMeal.foods);
	}
}
