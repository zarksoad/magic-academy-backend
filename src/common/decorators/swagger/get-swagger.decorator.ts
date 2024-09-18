import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

export function ApiGetOperation(
  summary: string,
  responseDto: any,
  bearerToken?: boolean,
  isArray?: boolean
) {
  const decorators = [
    ApiOperation({ summary }),
    ApiOkResponse({
      description: 'Request was successful',
      type: responseDto,
      isArray: isArray
    }),
    ApiBadRequestResponse({ description: 'Invalid query parameters' }),
    ApiUnauthorizedResponse({ description: 'Unauthorized access' }),
    ApiInternalServerErrorResponse({ description: 'Internal server error' }),
  ];

  if (bearerToken) {
    decorators.push(ApiBearerAuth());
  }

  return applyDecorators(...decorators);
}
