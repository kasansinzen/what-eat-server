import { Controller, Get } from '@nestjs/common';
import { FoodService } from './food.service';

@Controller('food')
export class FoodController {

  constructor(
    private foodService: FoodService
  ) { }

  @Get()
  getHello() {
    return this.foodService.getHelloFood();
  }
}
