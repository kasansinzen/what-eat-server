import { MealStatus } from "@module/daily-meal/daily-meal.enum";
import { Column, CreateDateColumn, Entity, ObjectIdColumn, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class DailyMeal {
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn()
  id: string;

  @Column()
  foods: string[];

  @Column()
  sheduleDate: Date;

  @Column({default: MealStatus.BREAKFAST})
  mealStatus: MealStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor(foods?: string[], sheduleDate?: Date, mealStatus?: MealStatus) {
    this.foods = foods || [];
    this.sheduleDate = sheduleDate || new Date;
    this.mealStatus = mealStatus || MealStatus.BREAKFAST;
  }
}