import { Controller, Get, Post, Query } from '@nestjs/common';
import { SearchFoodInput } from './dto/search-food.input';
import { FoodService } from './food.service';

@Controller('food')
export class FoodController {

  constructor(
    private foodService: FoodService
  ) { }

  @Get('/search')
  searchFood(@Query() searchFoodInput: SearchFoodInput) {
    return this.foodService.searchFoods(searchFoodInput);
  }

  @Post()
  saveFood() {
    
  }
}
