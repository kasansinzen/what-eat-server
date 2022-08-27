import { FoodModel } from "@module/food/models/food.type";
import { Args, Mutation, Resolver, Query } from "@nestjs/graphql";
import { SaveFoodInput } from "./dto/save-food.input";
import { SearchFoodInput } from "./dto/search-food.input";
import { FoodService } from "./food.service";

@Resolver(of => FoodModel)
export class FoodResolver {
  constructor(
    private foodService: FoodService
  ) { }

  @Query(returns => [FoodModel])
  searchFoods(@Args('searchFoodInput') searchFoodInput: SearchFoodInput) {
    return this.foodService.searchFoods(searchFoodInput);
  }

  @Mutation(returns => FoodModel)
  createFood(
    @Args('saveFoodInput') saveFoodInput: SaveFoodInput
  ) {
    return this.foodService.createFood(saveFoodInput);
  }
}