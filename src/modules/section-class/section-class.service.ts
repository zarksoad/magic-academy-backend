import { Injectable } from '@nestjs/common';
import { CreateSectionClassDto } from './dto/create-section-class.dto';
import { UpdateSectionClassDto } from './dto/update-section-class.dto';

@Injectable()
export class SectionClassService {
  create(createSectionClassDto: CreateSectionClassDto) {
    return 'This action adds a new sectionClass';
  }

  findAll() {
    return `This action returns all sectionClass`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sectionClass`;
  }

  update(id: number, updateSectionClassDto: UpdateSectionClassDto) {
    return `This action updates a #${id} sectionClass`;
  }

  remove(id: number) {
    return `This action removes a #${id} sectionClass`;
  }
}
