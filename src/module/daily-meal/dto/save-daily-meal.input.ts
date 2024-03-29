import { Field, ID, InputType } from "@nestjs/graphql";
import { IsDateString, IsUUID } from "class-validator";
import { MealStatus } from "../daily-meal.enum";

@InputType()
export class SaveDailyMealInput {
  
  @Field(type => [String], { defaultValue: [] })
  foods: string[];

  @IsDateString()
  @Field()
  scheduleDate: Date;

  @Field()
  mealStatus: MealStatus;
}