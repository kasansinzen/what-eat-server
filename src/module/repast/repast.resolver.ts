import { Args, Mutation, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { SaveRepastInput } from './dto/save-repast.input';
import { RepastService } from './repast.service';
import { RepastModel } from './models/repast.model';
import { FoodModel } from '@module/food/models/food.type';
import { FoodService } from '@module/food/food.service';

@Resolver(of => RepastModel)
export class RepastResolver {
	constructor(
		private repastService: RepastService,
		private foodService: FoodService,
	) { }

	@Mutation(returns => RepastModel)
	createRepast(@Args('saveRepastInput') saveRepastInput: SaveRepastInput) {
		return this.repastService.createRepast(saveRepastInput);
	}

	@ResolveField('foods', returns => [FoodModel])
	async foods(@Parent() repast: RepastModel) {
		console.log(repast.foods, await this.foodService.getMany(repast.foods));
		return this.foodService.getMany(repast.foods);
	}
}
