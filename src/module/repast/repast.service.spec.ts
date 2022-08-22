import { createMongoDb } from '@core/utils/createMongoDb';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Repast } from './entities/repast.entity';
import { RepastService } from './repast.service';

const requestSaveRepast = new Repast()

describe('RepastService', () => {
  let service: RepastService;
  let repository: Repository<Repast>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RepastService,
        {
          provide: getRepositoryToken(Repast),
          useValue: {
            create: jest.fn().mockResolvedValue(requestSaveRepast),
            save: jest.fn()
          }
        },
      ],
      imports: [
        createMongoDb,
        TypeOrmModule.forFeature([Repast])
      ],
    }).compile();

    service = module.get<RepastService>(RepastService);
    repository = module.get<Repository<Repast>>(getRepositoryToken(Repast));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Create Repast', () => {
    it('should be create new repast', () => {
      expect(service.createRepast(requestSaveRepast)).resolves.toEqual(requestSaveRepast);
    });
  });
});
