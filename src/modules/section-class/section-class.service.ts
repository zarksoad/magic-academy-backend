/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateSectionClassDto } from './dto/create-section-class.dto';
import { CreateClassService } from './services/create-classes/create-class.service';
import { UpdateSectionClassDto } from './dto/update-section-class.dto';
import { UpdateSectionClassService } from './services/update-classes/update-class.service';

@Injectable()
export class SectionClassService {
  constructor(
    private readonly createClassService: CreateClassService,
    private readonly updateSectionClassService: UpdateSectionClassService,
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
}
