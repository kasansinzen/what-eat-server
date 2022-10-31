import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { DailyMealService } from './daily-meal.service';
import { DailyMealModel } from './models/daily-meal.model';
import { SaveDailyMealInput } from './dto/save-daily-meal.input';
import { GetFoodInput } from './dto/get-food.input';
import { GetDailyMealInput } from './dto/get-daily-meal.input';
import { UpdateFoodsDailyMealInput } from './dto/update-foods-daily-meal.input';

@Resolver(of => DailyMealModel)
export class DailyMealResolver {
	constructor(
		private dailyMealService: DailyMealService,
	) { }

	@Query(returns => [DailyMealModel])
	getDailyMeals(getDailyMealInput: GetDailyMealInput) {
		return this.dailyMealService.getDailyMeals(getDailyMealInput);
	}

	@Query(returns => [String])
	getFoods(@Args('getFoodInput') getFoodInput: GetFoodInput) {
		return this.dailyMealService.getFoods(getFoodInput);
	}

	@Mutation(returns => DailyMealModel)
	createDailyMeal(@Args('saveDailyMealInput') saveDailyMealInput: SaveDailyMealInput) {
		return this.dailyMealService.createDailyMeal(saveDailyMealInput);
	}

	@Mutation(returns => DailyMealModel)
	editDailyMeal(
		@Args('id') id: string,
		@Args('saveDailyMealInput') saveDailyMealInput: SaveDailyMealInput
	) {
		return this.dailyMealService.editDailyMeal(id, saveDailyMealInput);
	}

	@Mutation(returns => DailyMealModel)
	updateFoodsDailyMeal(
		@Args('id') id: string,
		@Args('updateFoodsDailyMealInput') updateFoodsDailyMealInput: UpdateFoodsDailyMealInput
	) {
		return this.dailyMealService.updateFoodsDailyMeal(id, updateFoodsDailyMealInput);
	}

	// @ResolveField('foods', returns => [FoodModel])
	// async foods(@Parent() dailyMeal: DailyMealModel) {
	// 	return this.foodService.getMany(dailyMeal.foods);
	// }
}
