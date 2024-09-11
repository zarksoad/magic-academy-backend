/* eslint-disable no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from '../../dto/create-course.dto';
import { Course } from '../../entities/course.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IcreateCourse } from '../../interfaces/create-course.interface';
import { User } from '../../../user/entities';
import { TransactionalService } from '../../../../common/helpers/execute-transaction.helper';
import { CheckUserExistServiceCourse } from './check-users-to-create-courses.service';

@Injectable()
export class CreateCourseService implements IcreateCourse {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    private readonly checkUserExistCourse: CheckUserExistServiceCourse,
    private readonly transactionalService: TransactionalService, // Inject the TransactionalService
  ) {}

  async createCourse(createCourseDto: CreateCourseDto): Promise<Course> {
    // Execute the operation within a transaction
    return await this.transactionalService.executeInTransaction(
      async queryRunner => {
        // Create a new course instance
        const course = this.courseRepository.create(createCourseDto);

        // Save the course using the queryRunner's manager to ensure it's part of the transaction
        const savedCourse = await queryRunner.manager.save(course);

        // Check if the users exist
        const usersC: User[] = await this.checkUserExistCourse.checkUser(
          createCourseDto.user,
        );

        // Assign the users to the course
        savedCourse.users = usersC;

        // Save the updated course within the same transaction
        await queryRunner.manager.save(savedCourse);

        return savedCourse; // Return the created course
      },
    );
  }
}
