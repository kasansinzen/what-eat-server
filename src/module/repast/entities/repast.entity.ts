import { RepastStatus } from "@module/repast/repast.enum";
import { Column, CreateDateColumn, Entity, ObjectIdColumn, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Repast {
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn()
  id: string;

  @Column()
  foods: string[];

  @Column()
  sheduleDate: Date;

  @Column({default: RepastStatus.BREAKFAST})
  repastStatus: RepastStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor(foods?: string[], sheduleDate?: Date, repastStatus?: RepastStatus) {
    this.foods = foods || [];
    this.sheduleDate = sheduleDate || new Date;
    this.repastStatus = repastStatus || RepastStatus.BREAKFAST;
  }
}