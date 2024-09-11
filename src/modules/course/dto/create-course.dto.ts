/* eslint-disable no-undef */
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
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name should not be empty' })
  @MaxLength(255, {
    message: 'Name is too long. Maximum length is $constraint1 characters',
  })
  name: string;

  @ApiProperty({
    example: 'An introductory course on JavaScript covering the basics.',
    description: 'Description of the course',
    maxLength: 1000,
    required: false,
  })
  @IsString({ message: 'Description must be a string' })
  @IsOptional()
  @MaxLength(1000, {
    message:
      'Description is too long. Maximum length is $constraint1 characters',
  })
  description?: string;

  @ApiProperty({
    example: 'https://example.com/thumbnail.jpg',
    description: 'URL of the course thumbnail image',
    maxLength: 1000,
    required: false,
  })
  @IsString({ message: 'Thumbnail URL must be a string' })
  @IsOptional()
  @MaxLength(1000, {
    message:
      'Thumbnail URL is too long. Maximum length is $constraint1 characters',
  })
  thumbnail_url?: string;

  @ApiProperty({
    example: 'javascript-fundamentals',
    description: 'Slug for the course, used in URLs',
    maxLength: 1000,
  })
  @IsString({ message: 'Slug must be a string' })
  @IsNotEmpty({ message: 'Slug should not be empty' })
  @MaxLength(1000, {
    message: 'Slug is too long. Maximum length is $constraint1 characters',
  })
  slug: string;

  @ApiProperty({
    example: '2024-09-10T00:00:00.000Z',
    description: 'Date when the course is published',
    required: false,
    type: String,
  })
  @IsDate({ message: 'Published date must be a valid date' })
  @IsOptional()
  @Type(() => Date)
  published_at?: Date;

  @IsNumber({}, { message: 'User ID must be a number' })
  @IsOptional()
  user: number;

  @IsArray({ message: 'Topics must be an array of numbers' })
  @ArrayMinSize(1, { message: 'At least one topic must be provided' })
  @Type(() => Number)
  topic: number[];

  thumbnail: Express.Multer.File;
}
