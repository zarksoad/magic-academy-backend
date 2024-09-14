import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { Topic } from '../topics/entities/topic.entity';
import { FindUserRecommendedCoursesService } from './services/find-user-recommended-courses.service';
import { UserModule } from '../user/user.module';
import { FindCoursesRelatedToTopicsService } from './services/find-courses-related-to-topics.service';
import { CreateCourseService } from './services/create-courses/create-course.service';
import { TransactionalService } from '../../common/helpers/execute-transaction.helper';
import { User } from '../user/entities';
import { CheckUserExistServiceCourse } from './services/create-courses/check-users-to-create-courses.service';
import { TopicExist } from '../topics/services/verify-exist-topic.service';
import { VerifyTopicCourseService } from './services/create-courses/check-topics-courses.service';
import { FindAllCourses } from './services/get-all-courses/get-all-courses.service';
import { CloudinaryService } from '../../common/services/cloudinary.service';
import { UpdateCoursesService } from './services/update-courses/update-courses.service';
import { FindCourseExist } from './services/update-courses/find-course-exist.service';
import { UploadCloudinaryService } from '../../common/services/upload-cloudinary.service';
import { FindCoursesByUserService } from './services/find-course-by-user.service';
@Module({
  imports: [TypeOrmModule.forFeature([Course, Topic, User]), UserModule],
  controllers: [CourseController],
  providers: [
    CourseService,
    FindUserRecommendedCoursesService,
    FindCoursesRelatedToTopicsService,
    CreateCourseService,
    TransactionalService,
    CheckUserExistServiceCourse,
    TopicExist,
    VerifyTopicCourseService,
    FindAllCourses,
    UploadCloudinaryService,
    CloudinaryService,
    UpdateCoursesService,
    FindCourseExist,
    FindCoursesByUserService,
  ],
})
export class CourseModule {}
