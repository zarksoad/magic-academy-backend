/* eslint-disable @typescript-eslint/no-unused-vars */

import { Injectable } from '@nestjs/common';
import { Comment } from '../../../entities/comment.entity';

/* eslint-disable no-unused-vars */
interface ITransformerComment {
  transform(comment: Comment[]): any[];
}

@Injectable()
export class CommentTransformer implements ITransformerComment {
  transform(comments: Comment[]): any[] {
    const commentsMap = new Map<number, any>();
    comments.forEach(comment => {
      commentsMap.set(comment.id, { ...comment, children: [] });
    });
    const result: any[] = [];
    comments.forEach(comment => {
      if (comment.comments_id === null) {
        result.push(commentsMap.get(comment.id));
      } else {
        const parent = commentsMap.get(comment.comments_id);
        if (parent) {
          parent.children.push(commentsMap.get(comment.id));
        }
      }
    });

    return result;
  }
}
