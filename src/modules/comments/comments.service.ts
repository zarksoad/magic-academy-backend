/* eslint-disable no-unused-vars */
import { Inject, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CreateCommentService } from './services/create-new-comment/create-comment.service';
import { GetCommentsServices } from './services/get-comments/get-comment.service';
import { CommentTypeEnum } from './enums/comment-type/comment-type.enum';
import { Comment } from './entities/comment.entity';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class CommentsService {
  constructor(private readonly createCommentService: CreateCommentService) {}
  async create(createCommentDto: CreateCommentDto) {
    return await this.createCommentService.createComment(createCommentDto);
  }
}
