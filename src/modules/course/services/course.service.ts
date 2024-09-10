/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from '../dto/create-course.dto';
import { UpdateCourseDto } from '../dto/update-course.dto';
import { FindUserRecommendedCoursesService } from './find-user-recommended-courses.service';
import { CreateCourseService } from './create-courses/create-course.service';

@Injectable()
export class CourseService {
  constructor(
    private findUserRecommendedCoursesService: FindUserRecommendedCoursesService,
    private readonly createCourseService: CreateCourseService,
  ) {}

  async create(createCourseDto: CreateCourseDto) {
    return await this.createCourseService.createCourse(createCourseDto);
  }

  findUserRecommendedCourses(id: string): Promise<any> {
    return this.findUserRecommendedCoursesService.FindUserRecommendedCourses(
      id,
    );
  }

  findOne(id: number) {
    return `This action returns a #${id} course`;
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return `This action updates a #${id} course`;
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }
}
