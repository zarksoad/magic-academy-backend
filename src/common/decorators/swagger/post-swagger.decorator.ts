import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

export function ApiPostOperation(
  summary: string,
  responseDto: any,
  requestDto: any,
  bearerToken?: boolean,
) {
  const decorators = [
    ApiOperation({ summary }),
    ApiCreatedResponse({
      description: 'Resource created successfully',
      type: responseDto,
    }),
    ApiBadRequestResponse({ description: 'Invalid input data' }),
    ApiUnauthorizedResponse({ description: 'Unauthorized access' }),
    ApiInternalServerErrorResponse({ description: 'Internal server error' }),
    ApiBody({
      description: 'Request payload',
      type: requestDto,
    }),
  ];

  if (bearerToken) {
    decorators.push(ApiBearerAuth());
  }

  return applyDecorators(...decorators);
}
