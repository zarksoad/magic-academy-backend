import { Module } from '@nestjs/common';
import { SectionClassService } from './section-class.service';
import { SectionClassController } from './section-class.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SectionClass } from './entities/section-class.entity';
import { CheckCourseSectionExistService } from './services/create-classes/check-course-section-exist.service';
import { UploadCloudinaryService } from '../../common/services/upload-cloudinary.service';
import { CloudinaryService } from '../../common/services/cloudinary.service';
import { FindClassExist } from './services/update-classes/find-class-exist.service';
import { UpdateSectionClassService } from './services/update-classes/update-class.service';
import { CourseSection } from '../course-section/entities/course-section.entity';
import { FindAllClassService } from './services/find-all-class.service';
import { CreateClassService } from './services/create-classes/create-class.service';
import { GetClassByIdService } from './services/get-class-by-id/get-class-by-id.service';
import { CheckCourseEnrollment } from './services/get-class-by-id/check-user-enrollment.service';
import { UserCourse } from '../user/entities/user-course.entity';
import { CheckInstructorProvided } from './services/get-class-by-id/check-instructor-provided.service';
import { GetClassNumInCourseService } from './services/get-class-num-in-course.service';
import { GetCourseIdBySection } from './services/get-class-by-id/get-section-id-by-class.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([SectionClass, CourseSection, UserCourse]),
  ],
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
    GetClassByIdService,
    CheckCourseEnrollment,
    CheckInstructorProvided,
    GetClassNumInCourseService,
    GetCourseIdBySection
  ],
  exports: [FindAllClassService],
})
export class SectionClassModule {}
