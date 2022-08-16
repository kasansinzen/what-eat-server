import { Field, ID, ObjectType } from "@nestjs/graphql";
import { FoodType } from "../food/food.type";

@ObjectType()
export class RepastType {
  @Field(type => ID)
  id: string;

  @Field(type => FoodType)
  foods: string[];

  @Field()
  shedule: Date;

  @Field()
  repast: RepastType;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}