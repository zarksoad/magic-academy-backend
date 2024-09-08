/* eslint-disable no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from '../../entities/comment.entity';
import { Repository } from 'typeorm';

interface ICheckParentComment {
  checkParent(parentId: number): Promise<boolean>;
}

@Injectable()
export class CheckParentExistService implements ICheckParentComment {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}
  async checkParent(parentId: number): Promise<boolean> {
    const existParent = await this.commentRepository.findOne({
      where: { id: parentId },
    });
    if (!existParent) {
      throw new NotFoundException("The Parent comment doesn't exist");
    }
    return true;
  }
}
