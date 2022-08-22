import { FoodModel } from "@module/food/models/food.type";
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { SaveFoodInput } from "./dto/save-food.input";
import { FoodService } from "./food.service";

@Resolver(of => FoodModel)
export class FoodResolver {
  constructor(
    private foodService: FoodService
  ) { }

  @Mutation(returns => FoodModel)
  createFood(
    @Args('saveFoodInput') saveFoodInput: SaveFoodInput
  ) {
    return this.foodService.createFood(saveFoodInput);
  }
}