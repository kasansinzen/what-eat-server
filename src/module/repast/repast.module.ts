import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repast } from './entities/repast.entity';
import { RepastService } from './repast.service';
import { RepastController } from './repast.controller';
import { RepastResolver } from './repast.resolver';
import { FoodService } from '@module/food/food.service';
import { FoodModule } from '@module/food/food.module';
import { ResponseService } from '@core/services/http/response/response.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Repast]),
    FoodModule
  ],
  controllers: [RepastController],
  providers: [
    RepastService,
    RepastResolver,
    ResponseService
  ],

})
export class RepastModule {}
