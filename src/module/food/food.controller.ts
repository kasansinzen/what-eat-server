import { Controller, Get, Post } from '@nestjs/common';
import { FoodService } from './food.service';

@Controller('food')
export class FoodController {

  constructor(
    private foodService: FoodService
  ) { }

  @Post()
  saveFood() {
    
  }
}
