import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { CommentTypeEnum } from '../enums/comment-type/comment-type.enum';

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number; // Unique identifier for each comment

  @Column({ type: 'int', nullable: true })
  comments_id: number | null; // ID of the parent comment, if any

  @ManyToOne(() => Comment, comment => comment.children, {
    nullable: true,
  })
  @JoinColumn({ name: 'comments_id' })
  parent: Comment | null; // Relationship with the parent comment, if any

  @OneToMany(() => Comment, comment => comment.parent)
  children: Comment[]; // Array of child comments

  @Column({ type: 'varchar', length: 255 })
  title: string; // Title of the comment

  @Column({ type: 'text' })
  content: string; // Content of the comment

  @Column({ type: 'enum', enum: CommentTypeEnum })
  comment_type: CommentTypeEnum;

  @Column({ type: 'int' })
  comment_types_id: number; // Foreign key related to the comment type

  @CreateDateColumn()
  created_at: Date; // Date when the comment was created

  @Column({ type: 'int' })
  users_id: number; // Foreign key to the user who created the comment

  @ManyToOne(() => User, user => user.comment, {
    nullable: false,
  })
  @JoinColumn({ name: 'users_id' })
  user: User; // Relationship with the User entity
}
