/* eslint-disable no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateCourseSectionDto } from './dto/create-course-section.dto';
import type { CourseSection } from './entities/course-section.entity';
import { CreateSectionService } from './services/create-section.service';
import { FindAllSectionService } from './services/find-all-section.service';

@Injectable()
export class CourseSectionService {
  constructor(
    private readonly createSectionService: CreateSectionService,
    private readonly findAllSectionService: FindAllSectionService,
  ) {}

  async create(
    createCourseSectionDto: CreateCourseSectionDto,
  ): Promise<CourseSection> {
    return await this.createSectionService.createSection(
      createCourseSectionDto,
    );
  }

  async findAllSectionCourse(course: number) {
    return await this.findAllSectionService.getAll(course);
  }
}
