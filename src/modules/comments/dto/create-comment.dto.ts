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
  @IsOptional()
  @IsInt()
  comments_id?: number | null; // Optional field, can be null for root comments

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  title: string; // Title of the comment

  @IsNotEmpty()
  @IsString()
  content: string; // Content of the comment

  @IsNotEmpty()
  @IsEnum(CommentTypeEnum)
  comment_type: CommentTypeEnum; // Type of the related entity (e.g., 'Post', 'Photo')

  @IsNotEmpty()
  @IsInt()
  comment_types_id: number; // ID related to the comment type

  @IsInt()
  @IsOptional()
  users_id: number; // ID of the user who created the comment
}
