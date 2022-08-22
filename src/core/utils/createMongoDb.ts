import { Food } from "@module/food/entities/food.entity";
import { Repast } from "@module/repast/entities/repast.entity";
import { TypeOrmModule } from "@nestjs/typeorm"

export const createMongoDb = TypeOrmModule.forRoot({
  type: 'mongodb',
  url: "mongodb://localhost/what-eat",
  synchronize: true,
  useUnifiedTopology: true,
  entities: [
    Food,
    Repast
  ]
});