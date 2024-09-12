/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateSectionClassDto } from './dto/create-section-class.dto';
import { CreateClassService } from './services/create-classes/create-class.service';

@Injectable()
export class SectionClassService {
  constructor(private readonly createClassService: CreateClassService) {}
  async create(
    createSectionClassDto: CreateSectionClassDto,
    file?: Express.Multer.File,
  ) {
    return await this.createClassService.createClass(
      createSectionClassDto,
      file,
    );
  }
}
