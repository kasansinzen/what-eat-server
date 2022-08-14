import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DailyModule } from './module/daily/daily.module';

@Module({
  imports: [DailyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
