import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class FoodType {
  @Field(type => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  createdAt: string;

  @Field()
  updatedAt: string;
}