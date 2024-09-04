import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CommentTypeEnum } from '../enums/comment-type/comment-type.enum';

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'enum', enum: CommentTypeEnum })
  type: CommentTypeEnum;

  @Column({ type: 'int' })
  comment_parent_id: number | null;
  @ManyToOne(() => Comment, comment => comment.parent)
  @JoinColumn({ name: 'comment_parent_id' })
  parent: Comment;
  @OneToMany(() => Comment, comment => comment.children)
  children: Comment[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
