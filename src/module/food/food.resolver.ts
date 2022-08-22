import { FoodModel } from "@module/food/models/food.type";
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { FoodService } from "./food.service";

@Resolver(of => FoodModel)
export class FoodResolver {
  constructor(
    private foodService: FoodService
  ) { }

  @Mutation(returns => FoodModel)
  createFood(
    @Args('title') title: string
  ) {
    return this.foodService.createFood(title);
  }
}