import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { CommentTypeEnum } from '../enums/comment-type/comment-type.enum';

export class CreateCommentDto {
  @ApiProperty({
    example: 1,
    description:
      'ID of the comment, optional for new comments or root comments',
  })
  @IsOptional()
  @IsInt()
  comments_id?: number | null; // Optional field, can be null for root comments

  @ApiProperty({
    example: 'commentary title',
    description: 'Title of the comment',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  title: string; // Title of the comment

  @ApiProperty({
    example: 'personal opinion',
    description: 'Content of the comment',
  })
  @IsNotEmpty()
  @IsString()
  content: string; // Content of the comment

  @ApiProperty({
    example: 'COURSE',
    enum: CommentTypeEnum,
    description: 'Type of the related entity (e.g., COURSE, POST)',
  })
  @IsNotEmpty()
  @IsEnum(CommentTypeEnum)
  comment_type: CommentTypeEnum; // Type of the related entity

  @ApiProperty({
    example: 2,
    description: 'ID related to the comment type',
  })
  @IsNotEmpty()
  @IsInt()
  comment_types_id: number; // ID related to the comment type

  @ApiProperty({
    example: 1,
    description: 'ID of the user who created the comment',
  })
  @IsInt()
  @IsOptional()
  users_id: number; // ID of the user who created the comment
}
