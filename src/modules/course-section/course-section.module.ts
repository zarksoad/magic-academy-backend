import { Module } from '@nestjs/common';
import { CourseSectionService } from './course-section.service';
import { CourseSectionController } from './course-section.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseSection } from './entities/course-section.entity';
import { Course } from '../course/entities/course.entity';
import { CreateSectionService } from './services/create-section.service';
import { FindAllSectionService } from './services/find-all-section.service';

@Module({
  imports: [TypeOrmModule.forFeature([CourseSection, Course])],
  controllers: [CourseSectionController],
  providers: [
    CreateSectionService,
    CourseSectionService,
    FindAllSectionService,
  ],
})
export class CourseSectionModule {}
