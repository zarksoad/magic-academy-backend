/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { FindUserRecommendedCoursesService } from './services/find-user-recommended-courses.service';
import { CreateCourseService } from './services/create-courses/create-course.service';
import { Course } from './entities/course.entity';
import { FindAllCourses } from './services/get-all-courses/get-all-courses.service';
import { FindCoursesByUserIdService } from '../user/services/find-courses-by-user.service';
import { FindCoursesByUserService } from './services/find-course-by-user.service';
import { UpdateCoursesService } from './services/update-courses/update-courses.service';
import { FindAllCourseClassesService } from './services/get-all-courses/find-course-classes.service';

@Injectable()
export class CourseService {
  constructor(
    private findUserRecommendedCoursesService: FindUserRecommendedCoursesService,
    private readonly createCourseService: CreateCourseService,
    private readonly findAllCourses: FindAllCourses,
    private readonly findCoursesByUser: FindCoursesByUserService,
    private readonly updateCoursesService: UpdateCoursesService,
    private readonly findAllCourseClassesService: FindAllCourseClassesService
  ) {}

  async create(
    createCourseDto: CreateCourseDto,
    userId: number,
    file?: Express.Multer.File,
  ) {
    createCourseDto.user = userId;
    return await this.createCourseService.createCourse(createCourseDto, file);
  }

  findUserRecommendedCourses(id: number): Promise<Course[]> {
    return this.findUserRecommendedCoursesService.FindUserRecommendedCourses(
      id,
    );
  }

  findOne(id: number) {
    return `This action returns a #${id} course`;
  }

  update(
    id: number,
    updateCourseDto: UpdateCourseDto,
    file?: Express.Multer.File,
  ) {
    return this.updateCoursesService.updateCourse(id, updateCourseDto, file);
  }

  async findByUserId(userId: number): Promise<Course[]> {
    return this.findCoursesByUser.findCoursesByUserId(userId);
  }

  async findAll(): Promise<Course[]> {
    return await this.findAllCourses.getAll();
  }

  async FindCourseClasses(courseId:number):Promise<Course>{
    return this.findAllCourseClassesService.FindCourseClasses(courseId)
  }
}
