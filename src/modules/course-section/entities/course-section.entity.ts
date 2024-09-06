import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Course } from '../../course/entities/course.entity';
import { SectionClass } from '../../section-class/entities/section-class.entity';

@Entity('course_sections')
export class CourseSection {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Course, course => course.sections)
  course: Course;

  @OneToMany(() => SectionClass, sectionClass => sectionClass.courseSection)
  classes: SectionClass[];
}
