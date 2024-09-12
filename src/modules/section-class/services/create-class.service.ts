import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SectionClass } from '../entities/section-class.entity';
import { Repository } from 'typeorm';
import { CourseSection } from '../../course-section/entities/course-section.entity';
import { CreateSectionClassDto } from '../dto/create-section-class.dto';
@Injectable()
export class CreateClassService {
  constructor(
    @InjectRepository(SectionClass)
    private readonly createClassRepository: Repository<SectionClass>,

    @InjectRepository(CourseSection)
    private readonly sectionRepository: Repository<CourseSection>,
  ) {}

  async createClass(classDto: CreateSectionClassDto): Promise<SectionClass> {
    const section = await this.sectionRepository.findOne({
      where: { id: classDto.courseSectionId },
    });
    if (!section) {
      throw new Error('Section not found');
    }
    const newClass = this.createClassRepository.create({
      ...classDto,
      courseSection: section,
    });
    return await this.createClassRepository.save(newClass);
  }
}
