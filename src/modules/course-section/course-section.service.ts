/* eslint-disable no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateCourseSectionDto } from './dto/create-course-section.dto';
import type { CourseSection } from './entities/course-section.entity';
import { CreateSectionService } from './services/create-section.service';
import { FindAllSectionService } from './services/find-all-section.service';
import { SectionClass } from '../section-class/entities/section-class.entity';
import { FindAllSectionClassesService } from './services/find-all-class.service';

@Injectable()
export class CourseSectionService {
  constructor(
    private readonly createSectionService: CreateSectionService,
    private readonly findAllSectionService: FindAllSectionService,
    private readonly findAllSectionClassesService: FindAllSectionClassesService,
  ) {}

  async create(
    createCourseSectionDto: CreateCourseSectionDto,
  ): Promise<CourseSection> {
    return await this.createSectionService.createSection(
      createCourseSectionDto,
    );
  }

  async findAllSectionCourse(courseId: number) {
    return await this.findAllSectionService.getAll(courseId);
  }

  async findAllSectionClasses(section: number): Promise<SectionClass[]> {
    return await this.findAllSectionClassesService.getAll(section);
  }
}
