import { IsString, MaxLength, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateTopicDto {
  @IsString()
  @MinLength(3, {
    message: 'Must be at least 3 characters long',
  })
  @MaxLength(20, {
    message: 'must be at most 20 characters long.',
  })
  @Transform(({ value }) => value.toLowerCase())
  name: string;
}
