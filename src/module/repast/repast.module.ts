import { Module } from '@nestjs/common';
import { RepastService } from './repast.service';

@Module({
  providers: [RepastService]
})
export class RepastModule {}
