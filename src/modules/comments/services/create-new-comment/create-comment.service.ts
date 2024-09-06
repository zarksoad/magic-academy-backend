/* eslint-disable no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from '../../dto/create-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from '../../entities/comment.entity';
import { Repository } from 'typeorm';
import { CheckCommentType } from './check-if-comment-type-exist.service';
import { CheckParentExistService } from './check-parent-comment-exist.service';

interface ICreateComment {
  createComment(createCommentDto: CreateCommentDto): Promise<Comment>;
}

@Injectable()
export class CreateCommentService implements ICreateComment {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    private readonly checkCommentType: CheckCommentType,
    private readonly checkParentExistService: CheckParentExistService,
  ) {}
  async createComment(createCommentDto: CreateCommentDto): Promise<Comment> {
    const commentType = await this.checkCommentType.checking(
      createCommentDto.comment_types_id,
      createCommentDto.comment_type,
    );
    if (createCommentDto.comments_id !== null) {
      await this.checkParentExistService.checkParent(
        createCommentDto.comments_id,
      );
    }
    if (commentType) {
      const newComment = this.commentRepository.create(createCommentDto);
      const save = await this.commentRepository.save(newComment);
      return save;
    }
    throw new NotFoundException('CommentType_id not found');
  }
}
