/* eslint-disable no-unused-vars */
import { Controller, Post, Body, Get, UseGuards, Param } from '@nestjs/common';
import { CourseSectionService } from './course-section.service';
import { CreateCourseSectionDto } from './dto/create-course-section.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

@ApiTags('Sections')
@Controller('course-section')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CourseSectionController {
  constructor(private readonly courseSectionService: CourseSectionService) {}

  // @Roles(1, 2)
  @Post()
  async create(@Body() createCourseSectionDto: CreateCourseSectionDto) {
    return await this.courseSectionService.create(createCourseSectionDto);
  }

  @Get(':id/classes')
  async findSectionClasses(@Param('id') section: number) {
    return await this.courseSectionService.findAllSectionClasses(section);
  }

  @Get(':courseId')
  //querys example: { "courses_id": 1}
  async findAllCourseSection(@Param('courseId') courseId: number) {
    return await this.courseSectionService.findAllSectionCourse(courseId);
  }
}
