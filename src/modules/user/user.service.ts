/* eslint-disable no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateUSer, CreateMailService } from './services';
import { User } from './entities';
import { CreateUserDto, SendMailDto } from './dto';
import type SMTPTransport from 'nodemailer/lib/smtp-transport';
import { GetByIdUser } from './services/get-user.service';
import { GetLatestClassesInProgressByCourseByUserService } from './services/get-latest-classes-inprogress-byCourse-byUser.service';
import { CourseService } from '../course/course.service';
import { getClassesNumInCourse } from './helpers/get-course-classes-ids.helper';
import { GetLatestClassesInProgressByCourseByUserResponseDto } from './dto/dto-output/get-latest-classes-inprogress-byCourse-byUser-output.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly createUser: CreateUSer,
    private readonly mailService: CreateMailService,
    private readonly getByIdUser: GetByIdUser,
    private readonly getLatestClassesInProgressByCourseByUserService: GetLatestClassesInProgressByCourseByUserService,
    private courseService: CourseService
  ) { }

  async create(createUserDto: CreateUserDto, token?: string): Promise<User> {
    if (token) {
      return await this.createUser.saveUser(createUserDto, token);
    }
    return await this.createUser.saveUser(createUserDto);
  }

  async sendEmail(
    sendEmailDto: SendMailDto,
    user: number,
  ): Promise<SMTPTransport.SentMessageInfo> {
    return await this.mailService.sendMail(sendEmailDto, user);
  }

  async getUserById(id: number): Promise<Omit<User, 'password'>> {
    return await this.getByIdUser.findByIdUser(id);
  }

  async getLatestClassesInProgressByCourseByUser(id: number): Promise<GetLatestClassesInProgressByCourseByUserResponseDto[]> {
    const latestClasses:GetLatestClassesInProgressByCourseByUserResponseDto[] = await this.getLatestClassesInProgressByCourseByUserService.getLatestClassesInProgressByUserByCourse(id)

    // Getting numClassInCourse and numClassesInCourse
    await Promise.all(
      latestClasses.map(async (latestClass) => {
        const course_id = latestClass['course_id'];
        const class_id = latestClass["section_class_id"];

        const classCourses = await this.courseService.FindCourseClasses(course_id);

        const { numClassInCourse, numClassesInCourse } = await getClassesNumInCourse(classCourses, class_id);

        latestClass.numClassesInCourse = numClassesInCourse;
        latestClass.numClassInCourse = numClassInCourse;
      }));

    return latestClasses
  }
}
