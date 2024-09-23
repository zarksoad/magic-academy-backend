import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from '../entities/course.entity';
import { CourseDto } from '../dto/dto-output/findAllCourse.dto';

@Injectable()
export class FindCoursesByUserService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

  async findCoursesByUserId(userId: number): Promise<CourseDto[]> {
    const courses = await this.courseRepository
      .createQueryBuilder('course')
      .leftJoinAndSelect('course.users', 'user') 
      .where('user.id = :userId', { userId })
      .getMany();

    console.log(courses);

    const transformedResponse = courses.map(course => ({
      id: course.id,
      name: course.name,
      description: course.description,
      thumbnail_url: course.thumbnail_url,
      slug: course.slug,
      published_at: course.published_at,
      instructor_name: course.users?.[0]?.name || 'Unknown',
    }));

    return transformedResponse;
  }
}
