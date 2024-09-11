import { Module } from '@nestjs/common';
import { CourseService } from './services/course.service';
import { CourseController } from './course.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { Topic } from '../topics/entities/topic.entity';
import { FindUserRecommendedCoursesService } from './services/find-user-recommended-courses.service';
import { UserModule } from '../user/user.module';
import { FindCoursesRelatedToTopicsService } from './services/find-courses-related-to-topics.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([Course, Topic]),
    UserModule
  ],
  controllers: [CourseController],
  providers: [CourseService, FindUserRecommendedCoursesService, FindCoursesRelatedToTopicsService],
})
export class CourseModule {}
