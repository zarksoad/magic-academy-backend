/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SectionClass } from '../../entities/section-class.entity';
import { Repository } from 'typeorm';
import { CreateSectionClassDto } from '../../dto/create-section-class.dto';
import { CheckCourseSectionExistService } from './check-course-section-exist.service';
import { UploadCloudinaryService } from '../../../../common/services/upload-cloudinary.service';
@Injectable()
export class CreateClassService {
  constructor(
    @InjectRepository(SectionClass)
    private readonly createSectionClassRepository: Repository<SectionClass>,
    private readonly checkCourseSectionExistService: CheckCourseSectionExistService,
    private readonly uploadService: UploadCloudinaryService,
  ) {}

  async createClass(
    classDto: CreateSectionClassDto,
    file?: Express.Multer.File,
  ): Promise<SectionClass> {
    if (file) {
      try {
        classDto.url = await this.uploadService.upload(file);
      } catch (error) {
        throw new BadRequestException(`Failed to upload thumbnail`);
      }
    }
    const courseSection =
      await this.checkCourseSectionExistService.verifyCourseSection(
        classDto.courseSectionId,
      );
    const newClass = this.createSectionClassRepository.create({
      ...classDto,
      courseSection: courseSection,
    });
    return await this.createSectionClassRepository.save(newClass);
  }
}
