import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseSection } from '../../../course-section/entities/course-section.entity';

Injectable();
export class GetCourseIdBySection {
  constructor(
    @InjectRepository(CourseSection)
    private readonly courseSectionRepository: Repository<CourseSection>,
  ) {}

  async getCourse(sectionId: number) {
    const getCourse = await this.courseSectionRepository.findOne({
      where: { id: sectionId },
      relations: ['course'],
    });
    if (!getCourse) {
      throw new NotFoundException('Course not found');
    }
    return getCourse.course.id;
  }
}
