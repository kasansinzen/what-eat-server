import { DailyMeal } from "@module/daily-meal/entities/daily-meal.entity";
import { TypeOrmModule } from "@nestjs/typeorm"

export const createMongoDb = TypeOrmModule.forRoot({
  type: 'mongodb',
  url: "mongodb+srv://kasansin:XNf8j6Q3jRAnAxdO@cluster-01.lrnlnor.mongodb.net/?retryWrites=true&w=majority",
  synchronize: true,
  useUnifiedTopology: true,
  entities: [
    DailyMeal
  ]
});