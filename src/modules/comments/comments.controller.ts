/* eslint-disable no-unused-vars */
import { Controller, Post, Body, UseGuards, Query, Get } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';
import { User } from '../../common/decorators/user/user-Id.decorator';
import { CommentTypeEnum } from './enums/comment-type/comment-type.enum';

@Controller('comments')
@UseGuards(JwtAuthGuard)
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}
  @Post()
  create(@User() userId: number, @Body() createCommentDto: CreateCommentDto) {
    createCommentDto.users_id = userId;
    return this.commentsService.create(createCommentDto);
  }
  @Get()
  async getComments(
    @Query('comment_type') comment_type: CommentTypeEnum,
    @Query('comment_types_id') comment_types_id: number,
  ) {
    return await this.commentsService.getComments(
      comment_type,
      comment_types_id,
    );
  }
}
