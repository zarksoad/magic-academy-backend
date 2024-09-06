import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CourseSection } from "../../course-section/entities/course-section.entity";

@Entity('section_classes')
export class SectionClass {
@PrimaryGeneratedColumn()
id: number;

@Column()
title: string;

@Column('text', { nullable: true })
content: string;

@Column({ type: 'enum', enum: ['video', 'article'] })
class_type_name: 'video' | 'article';

@Column({ nullable: true })
duration: number;

@Column({ nullable: true })
url: string;

@ManyToOne(() => CourseSection, section => section.classes)
courseSection: CourseSection;
}