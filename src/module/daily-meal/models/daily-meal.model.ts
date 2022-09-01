import { Field, ID, ObjectType } from "@nestjs/graphql";
import { FoodModel } from "@module/food/models/food.type";
import { MealStatus } from "../daily-meal.enum";

@ObjectType()
export class DailyMealModel {
  @Field(type => ID)
  id: string;

  @Field(type => [FoodModel])
  foods: string[];

  @Field()
  sheduleDate: Date;

  @Field()
  mealStatus: MealStatus;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}