import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export function createApiResponseDto<TClassDataDto>(
  classDataDto: TClassDataDto,
) {
  class ApiResponseDto {
    @ApiProperty({ example: 200, description: 'Response status code' })
    @IsNumber()
    code: number;

    @ApiProperty({ example: 'Success', description: 'Response message' })
    @IsString()
    message: string;

    @ApiProperty({ description: 'User data', type: classDataDto })
    data: typeof classDataDto;
  }
  return ApiResponseDto;
}
