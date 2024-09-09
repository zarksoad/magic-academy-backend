/* eslint-disable no-unused-vars */
import {
  Controller,
  Post,
  Body,
  UseGuards,
  Query,
  Get,
  Inject,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';
import { UserId } from '../../common/decorators/user/user-Id.decorator';
import { CommentTypeEnum } from './enums/comment-type/comment-type.enum';
import { ApiPostOperation } from '../../common/decorators/swagger';
import { ApiGetOperation } from '../../common/decorators/swagger/get-swagger.decorator';
import { GetCommentsResponseDto } from './dto/get-comments.dto';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
@Controller('comments')
@UseGuards(JwtAuthGuard)
export class CommentsController {
  constructor(
    private readonly commentsService: CommentsService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}
  @Post()
  @ApiPostOperation(
    'Comment succesfully created ',
    CreateCommentDto,
    CreateCommentDto,
    true,
  )
  create(@UserId() userId: number, @Body() createCommentDto: CreateCommentDto) {
    createCommentDto.users_id = userId;
    return this.commentsService.create(createCommentDto);
  }

  @Get()
  @ApiGetOperation('comments', GetCommentsResponseDto, true)
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
