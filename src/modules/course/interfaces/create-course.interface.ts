/* eslint-disable no-unused-vars */
import { CreateCourseDto } from '../dto/create-course.dto';
import { Course } from '../entities/course.entity';

export interface IcreateCourse {
  createCourse(
    createCourseDto: CreateCourseDto,
    userId: number,
  ): Promise<Course>;
}
