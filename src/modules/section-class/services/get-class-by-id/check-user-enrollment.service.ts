import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserCourse } from '../../../user/entities/user-course.entity';

@Injectable()
export class CheckCourseEnrollment {
  constructor(
    @InjectRepository(UserCourse)
    private readonly userClassRepository: Repository<UserCourse>,
  ) {}
  async getEnrollment(userId: number): Promise<UserCourse> {
    const userCourse = await this.userClassRepository.findOne({
      where: { user: { id: userId } },
      relations: ['user'],
    });
    if (!userCourse) {
      throw new UnauthorizedException(
        "The user hasn't been enrollment to this class",
      );
    }
    return userCourse;
  }
}
