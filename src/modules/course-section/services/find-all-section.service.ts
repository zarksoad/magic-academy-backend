/* eslint-disable no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseSection } from '../entities/course-section.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FindAllSectionService {
  constructor(
    @InjectRepository(CourseSection)
    private readonly courseSectionRepository: Repository<CourseSection>,
  ) {}

  async getAll(course: number): Promise<CourseSection[]> {
    const sections = await this.courseSectionRepository.find({
      where: { course: { id: course } },
      relations: ['course'],
    });

    if (sections.length === 0) {
      throw new NotFoundException('No sections found for the given course');
    }
    return sections;
  }
}
