import { Injectable } from '@nestjs/common';
import { CreateSectionClassDto } from './dto/create-section-class.dto';
import { CreateClassService } from './services/create-class.service';

@Injectable()
export class SectionClassService {
  constructor(private readonly createClassService: CreateClassService) {}
  async create(createSectionClassDto: CreateSectionClassDto) {
    return await this.createClassService.createClass(createSectionClassDto);
  }
}
