import { Injectable } from '@nestjs/common';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  MaxLength,
  IsDate,
  IsNumber,
  ArrayMinSize,
  IsArray,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

@Injectable()
export class CreateCourseDto {
  @ApiProperty({
    example: 'JavaScript Fundamentals',
    description: 'Name of the course',
    maxLength: 255,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @ApiProperty({
    example: 'An introductory course on JavaScript covering the basics.',
    description: 'Description of the course',
    maxLength: 1000,
    required: false,
  })
  @IsString()
  @IsOptional()
  @MaxLength(1000)
  description?: string;

  @ApiProperty({
    example: 'https://example.com/thumbnail.jpg',
    description: 'URL of the course thumbnail image',
    maxLength: 1000,
    required: false,
  })
  @IsString()
  @IsOptional()
  @MaxLength(1000)
  thumbnail_url?: string;

  @ApiProperty({
    example: 'javascript-fundamentals',
    description: 'Slug for the course, used in URLs',
    maxLength: 1000,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  slug: string;

  @ApiProperty({
    example: '2024-09-10T00:00:00.000Z',
    description: 'Date when the course is published',
    required: false,
    type: String,
  })
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  published_at?: Date;

  @IsNumber()
  @IsOptional()
  user: number;

  @IsArray()
  @ArrayMinSize(1)
  topic: number[];
}
