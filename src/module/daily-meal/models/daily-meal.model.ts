import { Field, ID, ObjectType } from "@nestjs/graphql";
import { MealStatus } from "../daily-meal.enum";

@ObjectType()
export class DailyMealModel {
  @Field(type => ID)
  id: string;

  @Field(type => [String])
  foods: string[];

  @Field()
  scheduleDate: Date;

  @Field()
  mealStatus: MealStatus;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}