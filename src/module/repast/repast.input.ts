import { RepastStatus } from "./repast.enum";

export class SaveRepastDto {
  foods: string[];
  shedule: Date;
  repast: RepastStatus;
}