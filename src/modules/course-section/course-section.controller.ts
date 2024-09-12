import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { CourseSectionService } from './course-section.service';
import { CreateCourseSectionDto } from './dto/create-course-section.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@ApiTags('Sections')
@Controller('course-section')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CourseSectionController {
  constructor(private readonly courseSectionService: CourseSectionService) {}

  @Roles(2)
  @Post()
  async create(@Body() createCourseSectionDto: CreateCourseSectionDto) {
    return await this.courseSectionService.create(createCourseSectionDto);
  }

  @Get()
  //querys example: { "courses_id": 1}
  async FindAllCourseSection(@Body() course: number) {
    return await this.courseSectionService.findAllSectionCourse(course);
  }
}
