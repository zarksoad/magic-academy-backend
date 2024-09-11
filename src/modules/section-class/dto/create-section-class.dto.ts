import { Injectable } from '@nestjs/common';
import {
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';

@Injectable()
export class CreateSectionClassDto {
  @IsString()
  @MinLength(3, { message: 'Must be at least 3 characters long' })
  @MaxLength(50, { message: 'Must be at most 50 characters long' })
  title: string;

  @IsString()
  @IsOptional()
  @MinLength(15, { message: 'Must be at least 15 characters long' })
  content: string;

  @IsNumber()
  @IsOptional()
  duration: number;

  // @IsUrl()
  @IsOptional()
  videoUrl: string;

  @IsNumber({}, { message: 'Type is number' })
  courseSectionId: number;
}
