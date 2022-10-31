import { Test, TestingModule } from '@nestjs/testing';
import { IHttpResponse, ResponseService } from './response.service';

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

  describe('httpResponse', () => {
    let httpResponse: IHttpResponse;
    beforeEach(() => {
      httpResponse = service.httpResponse({message: "unit-test", total: 0});
    });

    it('should has all field complete', () => {
      expect(httpResponse).toHaveProperty('success');
      expect(httpResponse).toHaveProperty('message');
      expect(httpResponse).toHaveProperty('total');
      expect(httpResponse).toHaveProperty('result');
      expect(httpResponse).toHaveProperty('error');
    });

    it('should sort field is correct', () => {
      const keys = Object.keys(httpResponse);
      const properties = ['success', 'message', 'total', 'result', 'error'];
      keys.forEach((val, index) => {
        expect(val).toEqual(properties[index]);
      });
    });

    it('should get type of success are boolean', () => {
      expect(typeof httpResponse.success).toBe('boolean');
    });
    
    it('should get type of messeage are string', () => {
      expect(typeof httpResponse.message).toBe('string');
    });

    it('should get type of total are number', () => {
      expect(typeof httpResponse.total).toBe('number');
    });

    it('should get type of error are string', () => {
      expect(typeof httpResponse.error).toBe('string');
    });
  });

  describe('Status code', () => {
    it('status ok should is 200', () => {
      expect(service.httpStatusCode('ok')).toBe(200);
    });

    it('status noContent should is 204', () => {
      expect(service.httpStatusCode('noContent')).toBe(204);
    });
    it('status badRequest should is 400', () => {
      expect(service.httpStatusCode('badRequest')).toBe(400);
    });

    it('status serverError should is 500', () => {
      expect(service.httpStatusCode('serverError')).toBe(500);
    });

    it('status unAuthorize should is 401', () => {
      expect(service.httpStatusCode('unAuthorize')).toBe(401);
    });
  });
});
