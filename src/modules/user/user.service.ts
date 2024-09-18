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
import { GetLatestClassesInProgressByCourseByUserResponseDto, GetLatestClassesInProgressByCourseByUserWithClassNumResponseDto } from './dto/dto-output/get-latest-classes-inprogress-byCourse-byUser-output.dto';
import { EnrollService } from './services/enroll-user-course/enroll.service';
import { UserCourseDto } from './dto/enroll-user-course-dtos/user-course.dto';
import { addClassNumToLatestClassesTransformer } from './transformers/add-class-num-to-latest-classes.transformer';

@Injectable()
export class UserService {
  constructor(
    private readonly createUser: CreateUSer,
    private readonly mailService: CreateMailService,
    private readonly getByIdUser: GetByIdUser,
    private readonly getLatestClassesInProgressByCourseByUserService: GetLatestClassesInProgressByCourseByUserService,
    private readonly enrollService: EnrollService,
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

  async getLatestClassesInProgressByCourseByUser(id: number): Promise<GetLatestClassesInProgressByCourseByUserWithClassNumResponseDto[]> {
    return this.getLatestClassesInProgressByCourseByUserService.withClassNum(id)
  }

  async enrollStudentInCourse(userCourseDto: UserCourseDto) {
    return this.enrollService.enroll(userCourseDto);
  }
}
