import { Field, ID, ObjectType } from "@nestjs/graphql";
import { FoodModel } from "@module/food/models/food.type";
import { RepastStatus } from "../repast.enum";

@ObjectType()
export class RepastModel {
  @Field(type => ID)
  id: string;

  @Field(type => [FoodModel])
  foods: string[];

  @Field()
  sheduleDate: Date;

  @Field()
  repastStatus: RepastStatus;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}