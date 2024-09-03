import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpErrorFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    let exceptionResponse = exception.getResponse();

    if (
      exception instanceof BadRequestException &&
      typeof exceptionResponse === 'object' &&
      'message' in exceptionResponse
    ) {
      const { statusCode, message } = exceptionResponse as any;
      exceptionResponse = {
        statusCode: statusCode || status,
        timeStamp: new Date().toISOString(),
        path: request.url,
        method: request.method,
        message: message || 'Bad Request',
      };
    } else if (exception instanceof HttpException) {
      exceptionResponse = {
        statusCode: status,
        timeStamp: new Date().toISOString(),
        path: request.url,
        method: request.method,
        message: exceptionResponse['message'] || 'an unexpected error Ocurred',
      };
    }
    response.status(status).json(exceptionResponse);
  }
}
