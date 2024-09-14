/* eslint-disable no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SectionClass } from '../../entities/section-class.entity';

@Injectable()
export class FindClassExist {
  constructor(
    @InjectRepository(SectionClass)
    private readonly classRepository: Repository<SectionClass>,
  ) {}
  async findClassExist(id: number): Promise<SectionClass> {
    const sectionClass = await this.classRepository.findOne({ where: { id } });
    if (!sectionClass) {
      throw new NotFoundException('Course not found');
    }
    return sectionClass;
  }
}
