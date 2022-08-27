import { HttpStatusCode } from '@core/enums/status-code.enum';
import { Injectable } from '@nestjs/common';

export interface IHttpResponse {
  success?: boolean;
  message?: string;
  total?: number | null;
  result?: any;
  error?: string;
}

@Injectable()
export class ResponseService {
  private defaultHttpResponse: IHttpResponse = {
    success: true,
    message: "",
    total: null,
    result: null,
    error: ""
  }

  constructor() { }

  httpStatusCode(status: keyof HttpStatusCode): HttpStatusCode {
    return HttpStatusCode[status];
  }

  httpResponse(data: IHttpResponse): IHttpResponse {
    return {...this.defaultHttpResponse, ...data};
  }
}
