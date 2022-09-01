import { Field, ID, InputType } from "@nestjs/graphql";
import { IsDateString, IsUUID } from "class-validator";
import { MealStatus } from "../daily-meal.enum";

@InputType()
export class SaveDailyMealInput {
  
  @IsUUID("all", { each: true })
  @Field(type => [ID, String], { defaultValue: [] })
  foods: string[];

  @IsDateString()
  @Field()
  sheduleDate: Date;

  @Field()
  mealStatus: MealStatus;
}