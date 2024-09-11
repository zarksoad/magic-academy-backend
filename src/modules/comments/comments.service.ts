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
  constructor(
    private readonly createCommentService: CreateCommentService,
    private readonly getCommentsService: GetCommentsServices,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}
  async create(createCommentDto: CreateCommentDto) {
    return await this.createCommentService.createComment(createCommentDto);
  }

  async getComments(
    comment_type: CommentTypeEnum,
    comment_types_id: number,
  ): Promise<Comment[]> {
    const key = 'comments-find';
    const fetchedComments = await this.cacheManager.get(key);
    if (!fetchedComments) {
      const fetchedComments = await this.getCommentsService.getComments(
        comment_type,
        comment_types_id,
      );
      await this.cacheManager.set(key, fetchedComments, 1000 * 10);
      return fetchedComments;
    }
    return fetchedComments as [];
  }
}
