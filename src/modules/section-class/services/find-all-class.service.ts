import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SectionClass } from '../entities/section-class.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FindAllClassService {
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

    if (classes.length === 0) {
      throw new NotFoundException('No classes found for the given section');
    }

    return classes;
  }
}