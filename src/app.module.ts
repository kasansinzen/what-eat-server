import { createMongoDb } from '@core/utils/createMongoDb';
import { Food } from '@module/food/entities/food.entity';
import { Repast } from '@module/repast/entities/repast.entity';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FoodModule } from './module/food/food.module';
import { RepastModule } from './module/repast/repast.module';
import { ResponseService } from './core/services/http/response/response.service';

@Module({
  imports: [
    createMongoDb,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    FoodModule,
    RepastModule
  ],
  controllers: [AppController],
  providers: [AppService, ResponseService],
})
export class AppModule {}
