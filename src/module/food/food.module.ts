import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FoodController } from './food.controller';
import { Food } from './entities/food.entity';
import { FoodResolver } from './food.resolver';
import { FoodService } from './food.service';

@Module({
  imports: [TypeOrmModule.forFeature([Food])],
  exports: [FoodService],
  controllers: [FoodController],
  providers: [FoodService, FoodResolver],
})
export class FoodModule {}
