/* eslint-disable no-undef */
import { Injectable } from '@nestjs/common';
import { Type } from 'class-transformer';
import {
  IsNumber,
  IsOptional,
  IsString,
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
  // @IsUrl()
  @IsOptional()
  url: string;

  @IsOptional()
  created_at: Date;

  @IsNumber({}, { message: 'Type is number' })
  @Type(() => Number)
  courseSectionId: number;

  video: Express.Multer.File;
}
