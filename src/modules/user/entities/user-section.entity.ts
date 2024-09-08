import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserProgressEnum } from '../enums/user-sections.enum';
import { User } from './user.entity';
import { CourseSection } from '../../course-section/entities/course-section.entity';

@Entity('user_sections')
export class UserSection {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, type: 'enum', enum: UserProgressEnum })
  status: UserProgressEnum;

  @ManyToOne(() => User, user => user.userSections)
  @JoinColumn({ name: 'users_id' })
  user: User;

  @ManyToOne(() => CourseSection, courseSection => courseSection.userSections)
  @JoinColumn({ name: 'course_sections_id' })
  courseSection: CourseSection;
}
