import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
const test = { test: 'message' };
export class CreateUserDto {
  @ApiProperty({
    example: 'name',
  })
  @IsString()
  @MinLength(5, {
    message: 'must be at least 5 characters long.',
    context: test, // Usamos 'context' para pasar el objeto adicional
  })
  @MaxLength(100, {
    message: 'must be at most 100 characters long.',
    context: test, // Nuevamente, usamos 'context' para almacenar el objeto adicional
  })
  name: string;

  @IsString()
  @MinLength(6, { message: 'must be at least 6 characters long.' })
  @MaxLength(254, { message: 'must be at most 254 characters long.' })
  @Matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
    message: 'must be a valid email address.',
  })
  email: string;

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

  @IsString()
  @IsOptional()
  // @IsNotEmpty({ message: 'Avatar URL cannot be empty.' })
  @IsUrl() // Uncomment and test this if you need URL validation
  avatarUrl: string;

  @IsArray()
  @ArrayMinSize(1)
  topicIds: number[];
}
