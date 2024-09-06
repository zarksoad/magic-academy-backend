import { Module } from '@nestjs/common';
import { CourseSectionService } from './course-section.service';
import { CourseSectionController } from './course-section.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseSection } from './entities/course-section.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CourseSection])
  ],
  controllers: [CourseSectionController],
  providers: [CourseSectionService],
})
export class CourseSectionModule {}
