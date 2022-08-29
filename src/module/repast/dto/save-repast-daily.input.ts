import { Field, ID, InputType } from "@nestjs/graphql";
import { IsDateString, IsUUID } from "class-validator";
import { RepastStatus } from "../repast.enum";

@InputType()
export class SaveRepastDailyInput {
  
  @IsUUID("all", { each: true })
  @Field(type => [String], { defaultValue: [] })
  foods: string[];

  @IsDateString()
  @Field()
  sheduleDate: Date;

  @Field()
  repastStatus: RepastStatus;
}