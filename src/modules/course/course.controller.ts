/* eslint-disable no-unused-vars */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CourseService } from './services/course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserId } from '../../common/decorators/user/user-Id.decorator';
import { ApiPostOperation } from '../../common/decorators/swagger';

@Controller('courses')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  @Roles(2, 3)
  @ApiPostOperation('Create Course', CreateCourseDto, CreateCourseDto)
  async create(
    @Body() createCourseDto: CreateCourseDto,
    @UserId() userId: number,
  ) {
    createCourseDto.user = userId;
    return await this.courseService.create(createCourseDto);
  }

  @Get('/users/:id/recommended-courses')
  findUserRecommendedCourses(@Param('id') id: string) {
    return this.courseService.findUserRecommendedCourses(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.courseService.update(+id, updateCourseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseService.remove(+id);
  }
}
