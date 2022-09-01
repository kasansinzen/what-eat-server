import { Food } from "@module/food/entities/food.entity";
import { DailyMeal } from "@module/daily-meal/entities/daily-meal.entity";
import { TypeOrmModule } from "@nestjs/typeorm"

export const createMongoDb = TypeOrmModule.forRoot({
  type: 'mongodb',
  url: "mongodb://localhost/what-eat",
  synchronize: true,
  useUnifiedTopology: true,
  entities: [
    Food,
    DailyMeal
  ]
});