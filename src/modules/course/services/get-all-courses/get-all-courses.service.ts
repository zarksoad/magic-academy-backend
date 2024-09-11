/* eslint-disable no-unused-vars */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from '../../entities/course.entity';
import { Repository } from 'typeorm';
@Injectable()
export class FindAllCourses {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}
  async getAll(): Promise<Course[]> {
    return this.courseRepository.find();
  }
}
