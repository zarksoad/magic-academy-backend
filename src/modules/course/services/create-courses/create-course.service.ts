/* eslint-disable no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from '../../dto/create-course.dto';
import { Course } from '../../entities/course.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IcreateCourse } from '../../interfaces/create-course.interface';
import { User } from '../../../user/entities';

@Injectable()
export class CreateCourseService implements IcreateCourse {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  // async createCourse(createCourseDto: CreateCourseDto): Promise<Course> {
  //   // Use the transactional helper service to execute operations within a transaction
  //   return await this.transactionalService.executeInTransaction(
  //     async queryRunner => {
  //       // Create a new course instance
  //       console.log(createCourseDto);
  //       const user = createCourseDto.users_Id;

  //       const newCourse = this.courseRepository.create(createCourseDto);
  //       console.log('Coyrse created', newCourse);

  //       // Save the course using queryRunner.manager to ensure it's part of the transaction
  //       const courseCreated = await queryRunner.manager.save(newCourse);

  //       // Use the courseUsersService to add users to the course, passing the queryRunner for transactional consistency
  //       // await this.courseUsersService.createCourseUsers(
  //       //   courseCreated.id,
  //       //   userId,
  //       //   queryRunner,
  //       // );

  //       return courseCreated; // Return the created course
  //     },
  //   );
  // }
  async createCourse(createCourseDto: CreateCourseDto): Promise<Course> {
    const course = await this.courseRepository.create(createCourseDto);
    const savedCourse = await this.courseRepository.save(course);

    const users = await this.userRepository.find({
      where: { id: createCourseDto.user },
    });
    savedCourse.users = users;
    await this.courseRepository.save(savedCourse);
    return savedCourse;
  }
}
