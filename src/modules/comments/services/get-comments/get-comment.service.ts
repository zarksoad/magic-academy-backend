/* eslint-disable no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { Comment } from '../../entities/comment.entity';
import { CommentTypeEnum } from '../../enums/comment-type/comment-type.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

interface IGetComments {
  getComments(
    comment_type: CommentTypeEnum,
    comment_types_id: number,
  ): Promise<Comment[]>;
}

@Injectable()
export class GetCommentsServices implements IGetComments {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}
  async getComments(
    comment_type: CommentTypeEnum,
    comment_types_id: number,
  ): Promise<Comment[]> {
    const comments = await this.commentRepository.find({
      where: { comment_type, comment_types_id },
    });
    if (comments.length === 0) {
      throw new NotFoundException('No comments found for the given criteria');
    }
    return comments;
  }
}
