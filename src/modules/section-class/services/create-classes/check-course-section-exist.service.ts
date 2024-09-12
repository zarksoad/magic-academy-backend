/* eslint-disable no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CourseSection } from '../../../course-section/entities/course-section.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CheckCourseSectionExistService {
  constructor(
    @InjectRepository(CourseSection)
    private readonly courseSectionRepository: Repository<CourseSection>,
  ) {}

  async verifyCourseSection(courseSectionId: number): Promise<CourseSection> {
    const courseSection = await this.courseSectionRepository.findOne({
      where: { id: courseSectionId },
    });
    if (!courseSection) {
      throw new NotFoundException('Section not found');
    }
    return courseSection;
  }
}
