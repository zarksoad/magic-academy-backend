/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from '../../entities/course.entity';
import { Repository } from 'typeorm';
import { UpdateCourseDto } from '../../dto/update-course.dto';
import { FindCourseExist } from './find-course-exist.service';
import { UploadCloudinaryService } from '../../../../common/services/upload-cloudinary.service';

@Injectable()
export class UpdateCoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    private readonly findCourseExist: FindCourseExist,
    private readonly uploadCloudinaryService: UploadCloudinaryService,
  ) {}

  async updateCourse(
    id: number,
    updateCourseDto: UpdateCourseDto,
    file?: Express.Multer.File,
  ): Promise<Course> {
    const findCourse = await this.findCourseExist.findCourseExist(id);
    if (file) {
      updateCourseDto.thumbnail_url = await this.uploadCloudinaryService.upload(
        file,
        findCourse.thumbnail_url,
      );
    }
    const updatedCourse = await this.courseRepository.merge(
      findCourse,
      updateCourseDto,
    );
    await this.courseRepository.save(updatedCourse);
    return updatedCourse;
  }
}
