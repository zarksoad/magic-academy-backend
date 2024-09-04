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

    // If it's a BadRequestException with a message array
    if (
      exception instanceof BadRequestException &&
      typeof exceptionResponse === 'object' &&
      'message' in exceptionResponse &&
      Array.isArray(exceptionResponse['message'])
    ) {
      const { statusCode, message } = exceptionResponse as any; // Use 'any' temporarily to access statusCode and message
      exceptionResponse = {
        status: statusCode || status,
        type: request.url,
        method: request.method,
        title: 'Your request parameters',
        'invalid-params': message.map((msg: string) => {
          // Transform messages into a structured format
          const [name, ...reasonParts] = msg.split(' - ');
          return { name, reason: reasonParts.join(' - ') };
        }),
        timeStamp: new Date().toISOString(),
      };
    } else {
      // Default handling for other HttpExceptions
      exceptionResponse = {
        status: status,
        type: request.url,
        method: request.method,
        detail:
          typeof exceptionResponse === 'string'
            ? exceptionResponse
            : exceptionResponse['message'] || 'An unexpected error occurred',
        timeStamp: new Date().toISOString(),
      };
    }

    response.status(status).json(exceptionResponse);
  }
}
