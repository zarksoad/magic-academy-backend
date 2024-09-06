import { Injectable } from '@nestjs/common';
import { CreateCourseSectionDto } from './dto/create-course-section.dto';
import { UpdateCourseSectionDto } from './dto/update-course-section.dto';

@Injectable()
export class CourseSectionService {
  create(createCourseSectionDto: CreateCourseSectionDto) {
    return 'This action adds a new courseSection';
  }

  findAll() {
    return `This action returns all courseSection`;
  }

  findOne(id: number) {
    return `This action returns a #${id} courseSection`;
  }

  update(id: number, updateCourseSectionDto: UpdateCourseSectionDto) {
    return `This action updates a #${id} courseSection`;
  }

  remove(id: number) {
    return `This action removes a #${id} courseSection`;
  }
}
