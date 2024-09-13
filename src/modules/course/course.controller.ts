/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { UserId } from '../../common/decorators/user/user-Id.decorator';
import { ApiPostOperation } from '../../common/decorators/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { ApiGetOperation } from '../../common/decorators/swagger/get-swagger.decorator';
import { FindUserRecommendedCoursesOutputDto } from './dto/dto-output/findUserRecommededCoursesOutputDto';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Course } from './entities/course.entity';

@ApiTags('Courses')
@Controller('courses')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  @Roles(2, 3)
  @ApiPostOperation('Create Course', CreateCourseDto, CreateCourseDto)
  @UseInterceptors(FileInterceptor('thumbnail'))
  async create(
    @Body() createCourseDto: CreateCourseDto,
    @UserId() userId: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log(file);
    return await this.courseService.create(createCourseDto, userId, file);
  }

  @Get('/user/recommended-courses')
  @Roles(1)
  @ApiGetOperation('courses', FindUserRecommendedCoursesOutputDto, true)
  async findUserRecommededCourses(@UserId() id: number): Promise<Course[]> {
    return await this.courseService.findUserRecommendedCourses(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseService.findOne(+id);
  }

  @Patch(':id')
  @Roles(2)
  @UseInterceptors(FileInterceptor('thumbnail'))
  update(
    @Param('id') id: number,
    @Body() updateCourseDto: UpdateCourseDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.courseService.update(id, updateCourseDto, file);
  }

  @Get()
  @Roles(1)
  getAllCourses() {
    return this.courseService.findAll();
  }
}
