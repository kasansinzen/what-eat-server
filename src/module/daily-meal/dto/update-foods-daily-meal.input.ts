import { Field, ID, InputType } from "@nestjs/graphql";
import { IsDateString, IsUUID } from "class-validator";
import { MealStatus } from "../daily-meal.enum";

@InputType()
export class UpdateFoodsDailyMealInput {
  
  @Field(type => [String], { defaultValue: [] })
  foods: string[];
}