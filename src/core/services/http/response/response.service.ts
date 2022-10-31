import { EHttpStatusCode } from '@core/enums/status-code.enum';
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

  httpStatusCode(status: keyof typeof EHttpStatusCode): EHttpStatusCode {
    return EHttpStatusCode[status];
  }

  httpResponse(data: IHttpResponse = {}): IHttpResponse {
    return {...this.defaultHttpResponse, ...data};
  }
}
