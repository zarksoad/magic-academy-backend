import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SectionClass } from '../../section-class/entities/section-class.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FindAllSectionClassesService {
  constructor(
    @InjectRepository(SectionClass)
    private readonly classSectionRepository: Repository<SectionClass>,
  ) {}

  async getAll(sectionId: number): Promise<SectionClass[]> {
    if (!sectionId || sectionId < 1) {
      throw new BadRequestException('Invalid section ID');
    }

    const classes = await this.classSectionRepository.find({
      where: { courseSection: { id: sectionId } },
      relations: ['courseSection'],
    });
    console.log('****************************');
    console.log(classes);
    console.log('****************************');
    if (classes.length === 0) {
      // throw new NotFoundException('No classes found for the given section');
      return [];
    }

    return classes;
  }
}
