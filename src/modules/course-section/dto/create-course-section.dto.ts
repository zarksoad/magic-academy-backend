import { Injectable } from '@nestjs/common';
import { IsNumber, IsString, MaxLength, MinLength } from 'class-validator';

@Injectable()
export class CreateCourseSectionDto {
  @IsString()
  @MinLength(3, { message: 'Must be at least 3 characters long' })
  @MaxLength(30, { message: 'Must be at most 30 characters long' })
  name: string;

  @IsNumber({}, { message: 'Must be a number' })
  course: number;
}
