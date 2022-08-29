import { ResponseService } from '@core/services/http/response/response.service';
import { Body, Controller, Post } from '@nestjs/common';
import { SaveRepastDailyInput } from './dto/save-repast-daily.input';
import { RepastService } from './repast.service';

@Controller('repast')
export class RepastController {

  constructor(
    private repastService: RepastService,
    private responseService: ResponseService
  ) { }

  @Post('/save-daily')
  async saveRepastAnDaily(@Body() saveRepastDailyInput: SaveRepastDailyInput) {
    return this.responseService.httpResponse({
      result: await this.repastService.createRepastAnDaily(saveRepastDailyInput)
    });
  }
}
