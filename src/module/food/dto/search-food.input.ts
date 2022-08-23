import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class SearchFoodInput {
  @Field()
  keyword: string;

  @Field(() => Int)
  limit: number;

  @Field(() => Int)
  offset: number;
}