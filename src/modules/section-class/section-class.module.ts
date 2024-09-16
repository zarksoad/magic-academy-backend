import { Module } from '@nestjs/common';
import { SectionClassService } from './section-class.service';
import { SectionClassController } from './section-class.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SectionClass } from './entities/section-class.entity';
import { UserModule } from '../user/user.module';
import { CheckCourseSectionExistService } from './services/create-classes/check-course-section-exist.service';
import { UploadCloudinaryService } from '../../common/services/upload-cloudinary.service';
import { CloudinaryService } from '../../common/services/cloudinary.service';
import { FindClassExist } from './services/update-classes/find-class-exist.service';
import { UpdateSectionClassService } from './services/update-classes/update-class.service';
import { CourseSection } from '../course-section/entities/course-section.entity';
import { FindAllClassService } from './services/find-all-class.service';
import { CreateClassService } from './services/create-classes/create-class.service';

@Module({
  imports: [TypeOrmModule.forFeature([SectionClass, CourseSection])],
  controllers: [SectionClassController],
  providers: [
    SectionClassService,
    CreateClassService,
    CheckCourseSectionExistService,
    UploadCloudinaryService,
    CloudinaryService,
    FindClassExist,
    UpdateSectionClassService,
    FindAllClassService,
  ],
  exports: [FindAllClassService],
})
export class SectionClassModule {}
