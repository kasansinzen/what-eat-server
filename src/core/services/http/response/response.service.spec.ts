import { Test, TestingModule } from '@nestjs/testing';
import { ResponseService } from './response.service';

describe('ResponseService', () => {
  let service: ResponseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResponseService],
    }).compile();

    service = module.get<ResponseService>(ResponseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Field response', () => {
    it.todo('should has all field complete')
    it.todo('should sort field is correct')
    it.todo('should get type of success are boolean')
    it.todo('should get type of messeage are string')
    it.todo('should get type of total are number')
    it.todo('should get type of error are string')
  });

  describe('Status code', () => {
    it.todo('status ok should is 200');
    it.todo('status noContent should is 204');
    it.todo('status badRequest should is 400');
    it.todo('status serverError should is 500');
    it.todo('status unAuthorize should is 401');
  });
});
