import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CourseService } from './services/course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { ApiGetOperation } from '../../common/decorators/swagger/get-swagger.decorator';
import { FindUserRecommendedCoursesOutputDto } from './dto/dto-output/findUserRecommededCoursesOutputDto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Courses')
@Controller('course')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.courseService.create(createCourseDto);
  }

  @Get('/users/:id/recommended-courses')
  @Roles(1)
  @ApiGetOperation('courses', FindUserRecommendedCoursesOutputDto, true)
  findUserRecommededCourses(@Param('id') id:string) {
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
