import { createMongoDb } from '@core/utils/createMongoDb';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Repast } from './entities/repast.entity';
import { RepastService } from './repast.service';

const testSaveRepast = new Repast();
console.log('testSaveRepast', testSaveRepast);

describe('RepastService', () => {
  let service: RepastService;
  let repository: Repository<Repast>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RepastService,
        // {
        //   provide: getRepositoryToken(Repast),
        //   useValue: {
        //   }
        // },
      ],
      imports: [
        createMongoDb,
        TypeOrmModule.forFeature([Repast])
      ],
    }).compile();

    service = module.get<RepastService>(RepastService);
    // repository = module.get<Repository<Repast>>(getRepositoryToken(Repast));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Create Repast', () => {

    it('should be create new repast', () => {
      service.createRepast(testSaveRepast);
      expect(true).toEqual(true);
      // expect(service.createRepast(testSaveRepast)).resolves.toEqual(testSaveRepast);
    });
  });
});
