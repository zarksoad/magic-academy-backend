import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCourse } from '../../entities/user-course.entity';
import { Repository } from 'typeorm';
import { UserCourseDto } from '../../dto/enroll-user-course-dtos/user-course.dto';
import { FindUserByIdService } from '../find-user-by-id.service';
import { FindCourseExist } from '../../../course/services/update-courses/find-course-exist.service';

@Injectable()
export class UserCourseService {
  constructor(
    @InjectRepository(UserCourse)
    private readonly userCourseRepository: Repository<UserCourse>,
    private readonly findUserByIdService: FindUserByIdService,
    private readonly findCourseExist: FindCourseExist,
  ) {}
  async insertUserCourse(userCourseDto: UserCourseDto) {
    const userExists = this.findUserByIdService.findUserById(
      userCourseDto.userId,
    );

    if (!userExists) {
      throw new NotFoundException({
        status: 400,
        message: 'The user does not exist',
      });
    }

    const courseExist = this.findCourseExist.findCourseExist(
      userCourseDto.courseId,
    );
    if (!courseExist) {
      throw new NotFoundException({
        status: 400,
        message: 'the course does not exist',
      });
    }

    const userCourse = this.userCourseRepository.create({
      status: userCourseDto.status,
      user: { id: userCourseDto.userId },
      course: { id: userCourseDto.courseId },
    });
    return this.userCourseRepository.save(userCourse);
  }
}
