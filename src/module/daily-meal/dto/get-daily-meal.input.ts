import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class GetDailyMealInput {
  @Field()
  scheduleDate?: Date;
}