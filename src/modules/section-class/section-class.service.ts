import { Injectable } from '@nestjs/common';
import { CreateSectionClassDto } from './dto/create-section-class.dto';
import { CreateClassService } from './services/create-classes/create-class.service';
import { UpdateSectionClassService } from './services/update-classes/update-class.service';
import { UpdateSectionClassDto } from './dto/update-section-class.dto';
import {
  ClassWithCourseId,
  GetClassByIdService,
} from './services/get-class-by-id/get-class-by-id.service';
import { GetClassNumInCourseService } from './services/get-class-num-in-course.service';

@Injectable()
export class SectionClassService {
  constructor(
    private readonly createClassService: CreateClassService,
    private readonly updateSectionClassService: UpdateSectionClassService,
    private readonly getClassByIdService: GetClassByIdService,
    private readonly getClassNumInCourseService: GetClassNumInCourseService,
  ) {}
  async create(
    createSectionClassDto: CreateSectionClassDto,
    file?: Express.Multer.File,
  ) {
    return await this.createClassService.createClass(
      createSectionClassDto,
      file,
    );
  }
  update(
    id: number,
    updateSectionClassDto: UpdateSectionClassDto,
    file?: Express.Multer.File,
  ) {
    return this.updateSectionClassService.updateSectionClass(
      id,
      updateSectionClassDto,
      file,
    );
  }

  async getClassNumInCourse(classId: number): Promise<any> {
    return this.getClassNumInCourseService.getClassNumInCourse(classId);
  }

  async findClassById(
    id: number,
    userId: number,
    userRole: number,
  ): Promise<ClassWithCourseId> {
    id = id['id'];
    return await this.getClassByIdService.getClass(id, userId, userRole);
  }
}
