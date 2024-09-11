import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from '../dto/create-course.dto';
import { UpdateCourseDto } from '../dto/update-course.dto';
import { FindUserRecommendedCoursesService } from './find-user-recommended-courses.service';

@Injectable()
export class CourseService {

  constructor(private findUserRecommendedCoursesService:FindUserRecommendedCoursesService){}

  create(createCourseDto: CreateCourseDto) {
    return 'This action adds a new course';
  }

  findUserRecommendedCourses(id:string):Promise<any>{
    return this.findUserRecommendedCoursesService.FindUserRecommendedCourses(id)
  }

  findOne(id: number) {
    return `This action returns a #${id} course`;
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return `This action updates a #${id} course`;
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }
}
