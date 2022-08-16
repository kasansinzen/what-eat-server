import { FoodType } from "@module/food/food.type";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { FoodService } from "./food.service";

@Resolver(of => FoodType)
export class FoodResolver {
  constructor(
    private foodService: FoodService
  ) { }

  @Query(returns => String)
  hello() {
    return this.foodService.getHelloFood();
  }

  @Mutation(returns => FoodType)
  createFood(
    @Args('title') title: string
  ) {
    return this.foodService.createFood(title);
  }
}