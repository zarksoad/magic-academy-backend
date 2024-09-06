import { Module } from '@nestjs/common';
import { CourseSectionService } from './course-section.service';
import { CourseSectionController } from './course-section.controller';

@Module({
  controllers: [CourseSectionController],
  providers: [CourseSectionService],
})
export class CourseSectionModule {}
