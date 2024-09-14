import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from '../entities/course.entity';

@Injectable()
export class FindCoursesByUserService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

  async findCoursesByUserId(userId: number): Promise<Course[]> {
    const courses = await this.courseRepository
      .createQueryBuilder('course')
      .innerJoin('course.users', 'user')
      .where('user.id = :userId', { userId })
      .getMany();

    return courses;
  }
}
