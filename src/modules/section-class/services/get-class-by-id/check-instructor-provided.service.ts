import { Injectable, UnauthorizedException } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class CheckInstructorProvided {
  constructor(private readonly dataSource: DataSource) {}

  async checkUserCourseRelation(
    userId: number,
    courseId: number,
  ): Promise<boolean> {
    courseId = courseId['id']
    const relationExists = await this.dataSource
      .createQueryBuilder()
      .select('1')
      .from('course_users', 'course_users')
      .where('course_users.user_id = :userId', { userId })
      .andWhere('course_users.course_id  = :courseId', {courseId})
      .getRawOne();

    if (!relationExists) {
      throw new UnauthorizedException('the instructor is not the course owner');
    }

    return !!relationExists;
  }
}
