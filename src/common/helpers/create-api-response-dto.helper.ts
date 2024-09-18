import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

interface IcreateApiResponseDto<TClassDataDto> {
  classDataDto: TClassDataDto,
  isArray?: boolean
}

export function createApiResponseDto<TClassDataDto>({
  classDataDto,
  isArray = false
}: IcreateApiResponseDto<TClassDataDto>
) {
  class ApiResponseDto {
    @ApiProperty({ example: 200, description: 'Response status code' })
    @IsNumber()
    code: number;

    @ApiProperty({ example: 'Success', description: 'Response message' })
    @IsString()
    message: string;

    @ApiProperty({ description: 'User data', type: classDataDto, isArray })
    data: TClassDataDto | TClassDataDto[];
  }
  return ApiResponseDto;
}
