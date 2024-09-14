/* eslint-disable no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseSection } from '../entities/course-section.entity';
import { Repository } from 'typeorm';
import { CreateCourseSectionDto } from '../dto/create-course-section.dto';
import { Course } from '../../course/entities/course.entity';

@Injectable()
export class CreateSectionService {
  constructor(
    @InjectRepository(CourseSection)
    private readonly courseSectionRepository: Repository<CourseSection>,
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

  async createSection(
    courseSectionDto: CreateCourseSectionDto,
  ): Promise<CourseSection> {
    const course = await this.courseRepository.findOne({
      where: { id: courseSectionDto.course },
    });
    if (!course) {
      throw new NotFoundException('The course does not exist');
    }
    const section = this.courseSectionRepository.create({
      ...courseSectionDto,
      course,
    });
    return await this.courseSectionRepository.save(section);
  }
}
