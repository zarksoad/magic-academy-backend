import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseSectionModule } from './course-section/course-section.module';
import { SectionClassModule } from './section-class/section-class.module';
import { TopicsModule } from './topics/topics.module';
import { DatabaseConfigService } from '../common/config';
import { UserModule } from './user/user.module';
import { CourseModule } from './course/course.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConfigService,
    }),
    UserModule,
    CourseModule,
    CourseSectionModule,
    SectionClassModule,
    TopicsModule,
  ],
  providers: [DatabaseConfigService],
  exports: [DatabaseConfigService],
})
export class DatabaseModule {}
