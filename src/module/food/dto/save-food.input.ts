import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class SaveFoodInput {
  @Field()
  title: string;
}