import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { Repast } from './entities/repast.entity';
import { v4 as uuid} from 'uuid';
import { SaveRepastInput } from './dto/save-repast.input';

@Injectable()
export class RepastService {

  constructor(
    @InjectRepository(Repast) private repastRepository: MongoRepository<Repast>,
  ) { }

  getRepasts() {
    return this.repastRepository.find();
  }

  async createRepast(saveRepastInput: SaveRepastInput) {
    const {foods, repastStatus, sheduleDate} = saveRepastInput;
    const repast = this.repastRepository.create({
      id: uuid(),
      foods,
      sheduleDate,
      repastStatus
    });
    await this.repastRepository.save(repast);
    return repast;
  }
}
