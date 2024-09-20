import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { createApiResponseDto } from '../../../common/helpers/create-api-response-dto.helper';

export class CreateUserDto {
  @ApiProperty({
    example: 'John Doe',
    description:
      'The full name of the user. Must be between 5 and 100 characters long.',
  })
  @IsString()
  @MinLength(5, { message: 'must be at least 5 characters long.' })
  @MaxLength(100, { message: 'must be at most 100 characters long.' })
  name: string;

  @ApiProperty({
    example: 'johndoe@example.com',
    description:
      'A valid email address for the user. Must be between 6 and 254 characters long.',
  })
  @IsString()
  @MinLength(6, { message: 'must be at least 6 characters long.' })
  @MaxLength(254, { message: 'must be at most 254 characters long.' })
  @Matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
    message: 'must be a valid email address.',
  })
  email: string;

  @ApiProperty({
    example: 'Passw0rd!',
    description:
      'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character.',
  })
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long.' })
  @MaxLength(100, { message: 'Password must be at most 100 characters long.' })
  @Matches(
    /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message:
        'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character.',
    },
  )
  password: string;

  @ApiProperty({
    example:
      'URL for the user avatar image. If not provided, a default image will be used.', // Un ejemplo claro para la URL del avatar
    description:
      'URL for the user avatar image. If not provided, a default image will be used.',
    required: false,
  })
  @IsString()
  @IsOptional()
  @IsUrl({}, { message: 'must be a valid URL.' })
  avatarUrl: string;

  @ApiProperty({
    example: [1, 2, 3],
    description: 'An array of topic IDs associated with the user.',
  })
  @IsArray()
  @ArrayMinSize(1)
  topicIds: number[];
}

export const CreateUserReponseDto = createApiResponseDto({
  classDataDto: CreateUserDto,
  isArray: false
})