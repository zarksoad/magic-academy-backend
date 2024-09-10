import { Module } from '@nestjs/common';
import { CourseService } from './services/course.service';
import { CourseController } from './course.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { Topic } from '../topics/entities/topic.entity';
import { FindUserRecommendedCoursesService } from './services/find-user-recommended-courses.service';
import { UserModule } from '../user/user.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([Course, Topic]),
    UserModule
  ],
  controllers: [CourseController],
  providers: [CourseService, FindUserRecommendedCoursesService],
})
export class CourseModule {}
