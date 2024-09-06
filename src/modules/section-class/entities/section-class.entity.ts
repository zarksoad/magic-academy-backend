import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CourseSection } from "../../course-section/entities/course-section.entity";
import { ClassTypeEnum } from "../enums/class-type.enum";
import { UserClass } from "../../user/entities/user-classes.entity";

@Entity('section_classes')
export class SectionClass {
@PrimaryGeneratedColumn()
id: number;

@Column()
title: string;

@Column('text', { nullable: true })
content: string;

@Column({ type: 'enum', enum: ClassTypeEnum })
class_type_name: ClassTypeEnum;

@Column({ nullable: true })
duration: number;

@Column({ nullable: true })
url: string;

@ManyToOne(() => CourseSection, section => section.classes)
@JoinColumn({name: 'course_sections_id'})
courseSection: CourseSection;

@OneToMany(() => UserClass, userClass => userClass.sectionClasses)
userClass: UserClass;
}