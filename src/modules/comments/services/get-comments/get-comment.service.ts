/* eslint-disable no-unused-vars */
import { Comment } from '../../entities/comment.entity';
import { CommentTypeEnum } from '../../enums/comment-type/comment-type.enum';

interface IGetComments {
  getComments(
    comment_type: CommentTypeEnum,
    comment_types_id: number,
  ): Promise<Comment[]>;
}
