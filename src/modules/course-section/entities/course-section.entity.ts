import { Course } from "src/modules/course/entities/course.entity";
import { SectionClass } from "src/modules/section-class/entities/section-class.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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
