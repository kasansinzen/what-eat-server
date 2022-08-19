import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Repast } from './repast.entity';
import { v4 as uuid} from 'uuid';

@Injectable()
export class RepastService {

  constructor(
    @InjectRepository(Repast) private repastRepository: Repository<Repast>
  ) { }

  createRepast() {
    const repast = this.repastRepository.create({
      id: uuid(),
      
    })
  }
}
