/* eslint-disable no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CreateCommentService } from './services/create-new-comment/create-comment.service';

@Injectable()
export class CommentsService {
  constructor(private readonly createCommentService: CreateCommentService) {}
  async create(createCommentDto: CreateCommentDto) {
    return await this.createCommentService.createComment(createCommentDto);
  }
}
