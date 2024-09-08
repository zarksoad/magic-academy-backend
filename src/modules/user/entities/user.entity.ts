import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from './role.entity';
import { Topic } from '../../topics/entities/topic.entity';
import { Token } from './token.entity';

import { Comment } from '../../comments/entities/comment.entity';
import { UserCourse } from './user-course.entity';
import { UserSection } from './user-section.entity';
import { UserClass } from './user-classes.entity';
@Entity('users')
export class User {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 106 })
  password: string;

  @Column({ type: 'text', name: 'avatar_url' })
  avatarUrl: string;

  @Column({ type: 'int' })
  roleId: number;

  @ManyToOne(() => Role, role => role.users)
  @JoinColumn({ name: 'roleId' })
  role: Role;

  @ManyToMany(() => Topic, topic => topic.users)
  @JoinTable({
    name: 'user_topics',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'topic_id', referencedColumnName: 'id' },
  })
  topics: Topic[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  updatedAt: Date;

  @OneToMany(() => Token, token => token.createdBy)
  tokens: Token[];

  @OneToMany(() => Comment, comment => comment)
  comment: Comment[];

  @OneToMany(() => UserCourse, userCourse => userCourse.user)
  userCourses: UserCourse[];

  @OneToMany(() => UserSection, userSection => userSection)
  userSections: UserSection[];

  @OneToMany(() => UserClass, userClasses => userClasses.user)
  userClasses: UserClass[];
}
