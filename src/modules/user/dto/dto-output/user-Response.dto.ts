import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsDateString } from 'class-validator';
import { createApiResponseDto } from '../../../../common/helpers/create-api-response-dto.helper';

export class UserResponseDataDto {
  @ApiProperty({ example: 1, description: 'User ID' })
  @IsNumber()
  id: number;

  @ApiProperty({ example: 'admin', description: 'User name' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'N/A', description: 'Avatar URL' })
  @IsString()
  avatarUrl: string;

  @ApiProperty({
    example: '2024-09-09T21:51:52.000Z',
    description: 'Date the user was created',
  })
  @IsDateString()
  createdAt: string;

  @ApiProperty({
    example: '2024-09-09T21:51:52.000Z',
    description: 'Date the user was updated',
  })
  @IsDateString()
  updatedAt: string;
}
export const UserResponseDto = createApiResponseDto(UserResponseDataDto);
