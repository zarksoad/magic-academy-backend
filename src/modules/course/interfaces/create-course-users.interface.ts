import { QueryRunner } from 'typeorm';
/* eslint-disable no-unused-vars */
export interface IcreateCourseUsers {
  createCourseUsers(
    courseId: number,
    usersId: number,
    queryRunner: QueryRunner,
  ): Promise<void>;
}
