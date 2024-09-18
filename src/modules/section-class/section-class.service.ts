/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateSectionClassDto } from './dto/create-section-class.dto';
import { CreateClassService } from './services/create-classes/create-class.service';
import { FindAllClassService } from './services/find-all-class.service';
import { SectionClass } from './entities/section-class.entity';
import { UpdateSectionClassService } from './services/update-classes/update-class.service';
import { UpdateSectionClassDto } from './dto/update-section-class.dto';
import { GetClassByIdService } from './services/get-class-by-id/get-class-by-id.service';

@Injectable()
export class SectionClassService {
  constructor(
    private readonly createClassService: CreateClassService,
    private readonly updateSectionClassService: UpdateSectionClassService,
    private readonly findSectionService: FindAllClassService,
    private readonly getClassByIdService: GetClassByIdService,
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

  async findClassSection(section: number): Promise<SectionClass[]> {
    return await this.findSectionService.getAll(section);
  }
  async findClassById(
    id: number,
    userId: number,
    userRole: number,
  ): Promise<SectionClass> {
    return await this.getClassByIdService.getClass(id, userId, userRole);
  }
}
