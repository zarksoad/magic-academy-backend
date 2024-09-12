import { Injectable } from '@nestjs/common';
import { CreateSectionClassDto } from './dto/create-section-class.dto';
import { CreateClassService } from './services/create-class.service';
import { FindAllClassService } from './services/find-all-class.service';
import { SectionClass } from './entities/section-class.entity';

@Injectable()
export class SectionClassService {
  constructor(
    private readonly createClassService: CreateClassService,
    private readonly findSectionService: FindAllClassService,
  ) {}
  async create(createSectionClassDto: CreateSectionClassDto) {
    return await this.createClassService.createClass(createSectionClassDto);
  }

  async findClassSection(section: number): Promise<SectionClass[]> {
    return await this.findSectionService.getAll(section);
  }
}
