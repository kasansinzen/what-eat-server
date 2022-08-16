import { RepastType } from "@module/repast/repast.enum";
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
  shedule: Date;

  @Column()
  repast: RepastType;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}