/* eslint-disable no-unused-vars */
import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';
import { UserId } from '../../common/decorators/user/user-Id.decorator';

@Controller('comments')
@UseGuards(JwtAuthGuard)
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}
  @Post()
  create(@UserId() userId: number, @Body() createCommentDto: CreateCommentDto) {
    createCommentDto.users_id = userId;
    return this.commentsService.create(createCommentDto);
  }
}
