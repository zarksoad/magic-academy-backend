/* eslint-disable no-unused-vars */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from '../../entities/course.entity';
import { Repository } from 'typeorm';
import { CourseDto } from '../../dto/dto-output/findAllCourse.dto';
@Injectable()
export class FindAllCourses {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}
  async getAll(): Promise<CourseDto[]> {
    const apiResponse = await this.courseRepository.find();
    const transformedResponse = apiResponse.map(course => ({
      id: course.id,
      name: course.name,
      description: course.description,
      thumbnail_url: course.thumbnail_url,
      slug: course.slug,
      published_at: course.published_at,
      instructor_name: course.users?.[0]?.name || 'Unknown',
    }));
    return transformedResponse 
  }
}
