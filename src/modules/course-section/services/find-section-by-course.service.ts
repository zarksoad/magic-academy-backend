import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseSection } from '../entities/course-section.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FindSectionsByCourseService {
  constructor(
    @InjectRepository(CourseSection)
    private readonly sectionsRepository: Repository<CourseSection>,
  ) {}
}
