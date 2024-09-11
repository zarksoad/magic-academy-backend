import { Module } from '@nestjs/common';
import { SectionClassService } from './section-class.service';
import { SectionClassController } from './section-class.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SectionClass } from './entities/section-class.entity';
import { CourseSection } from '../course-section/entities/course-section.entity';
import { CreateClassService } from './services/create-class.service';

@Module({
  imports: [TypeOrmModule.forFeature([SectionClass, CourseSection])],
  controllers: [SectionClassController],
  providers: [SectionClassService, CreateClassService],
})
export class SectionClassModule {}
