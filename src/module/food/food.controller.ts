import { IHttpResponse, ResponseService } from '@core/services/http/response/response.service';
import { Controller, Get, Post, Query } from '@nestjs/common';
import { SearchFoodInput } from './dto/search-food.input';
import { FoodService } from './food.service';

@Controller('food')
export class FoodController {

  constructor(
    private foodService: FoodService,
    private responseService: ResponseService
  ) { }

  @Get('/search')
  async searchFood(@Query() searchFoodInput: SearchFoodInput): Promise<IHttpResponse> {
    return this.responseService.httpResponse({
      result: await this.foodService.searchFoods(searchFoodInput)
    });
  }
}
