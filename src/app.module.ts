import { createMongoDb } from '@core/utils/createMongoDb';
import { DailyMeal } from '@module/daily-meal/entities/daily-meal.entity';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DailyMealModule } from './module/daily-meal/daily-meal.module';
import { ResponseService } from './core/services/http/response/response.service';

@Module({
  imports: [
    createMongoDb,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    DailyMealModule,
  ],
  controllers: [AppController],
  providers: [AppService, ResponseService],
})
export class AppModule {}
