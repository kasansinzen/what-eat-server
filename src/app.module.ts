import { Food } from '@module/food/food.entity';
import { Repast } from '@module/repast/repast.entity';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FoodModule } from './module/food/food.module';
import { RepastModule } from './module/repast/repast.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: "mongodb://localhost/what-eat",
      synchronize: true,
      useUnifiedTopology: true,
      entities: [
        Food,
        Repast
      ]
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    FoodModule,
    RepastModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
