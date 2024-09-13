/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UploadCloudinaryService } from '../../../../common/services/upload-cloudinary.service';
import { SectionClass } from '../../entities/section-class.entity';
import { FindClassExist } from './find-class-exist.service';
import { UpdateSectionClassDto } from '../../dto/update-section-class.dto';

@Injectable()
export class UpdateSectionClassService {
  constructor(
    @InjectRepository(SectionClass)
    private readonly sectionClassRepository: Repository<SectionClass>,
    private readonly findClassExist: FindClassExist,
    private readonly uploadCloudinaryService: UploadCloudinaryService,
  ) {}

  async updateSectionClass(
    id: number,
    updateSectionClassDto: UpdateSectionClassDto,
    file?: Express.Multer.File,
  ): Promise<SectionClass> {
    const findClass = await this.findClassExist.findClassExist(id);
    if (file) {
      updateSectionClassDto.url = await this.uploadCloudinaryService.upload(
        file,
        findClass.url,
      );
    }
    const updatedCourse = await this.sectionClassRepository.merge(
      findClass,
      updateSectionClassDto,
    );
    await this.sectionClassRepository.save(updatedCourse);
    return updatedCourse;
  }
}
