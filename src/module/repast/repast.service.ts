import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { Repast } from './entities/repast.entity';
import { v4 as uuid} from 'uuid';
import { SaveRepastInput } from './dto/save-repast.input';
import { SaveRepastDailyInput } from './dto/save-repast-daily.input';
import { FoodService } from '@module/food/food.service';

@Injectable()
export class RepastService {

  constructor(
    @InjectRepository(Repast) private repastRepository: MongoRepository<Repast>,
    private foodService: FoodService,
  ) { }

  getRepasts() {
    return this.repastRepository.find();
  }

  async createRepast(saveRepastInput: SaveRepastInput) {
    const {foods, repastStatus, sheduleDate} = saveRepastInput;
    const repast = this.repastRepository.create({
      id: uuid(),
      foods,
      sheduleDate,
      repastStatus
    });
    await this.repastRepository.save(repast);
    return repast;
  }

  async createRepastAnDaily(saveRepastDaily: SaveRepastDailyInput) {
    const {foods} = saveRepastDaily;
    const foodsExist = await this.foodService.getFoodsByForceExist(foods.map(title => ({title})));
    const repast = await this.createRepast({
      ...saveRepastDaily,
      foods: foodsExist.map(food => food.id)
    });

    return repast;
  }
}
