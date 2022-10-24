import { MealStatus } from "@module/daily-meal/daily-meal.enum";
import { Column, CreateDateColumn, Entity, ObjectIdColumn, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class DailyMeal {
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn()
  id: string;

  @Column({default: []})
  foods: string[];

  @Column()
  scheduleDate: Date;

  @Column({default: MealStatus.BREAKFAST})
  mealStatus: MealStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor(foods?: string[], scheduleDate?: Date, mealStatus?: MealStatus) {
    this.foods = foods || [];
    this.scheduleDate = scheduleDate || new Date;
    this.mealStatus = mealStatus || MealStatus.BREAKFAST;
  }
}