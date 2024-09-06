import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Course } from "../../course/entities/course.entity";

@Entity('user_courses')
export class UserCourse{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    status: string;

    @ManyToOne(() => User, user => user.userCourses)
    @JoinColumn({name:'users_id'})
    user: User;

    @ManyToOne(() => Course, course => course.userCourses)
    @JoinColumn({name: 'courses_id'})
    course: Course;
}