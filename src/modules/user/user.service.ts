/* eslint-disable no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateUSer, CreateMailService } from './services';
import { User } from './entities';
import { CreateUserDto, SendMailDto } from './dto';
import type SMTPTransport from 'nodemailer/lib/smtp-transport';
import { GetByIdUser } from './services/get-user.service';
import { GetLatestClassesInProgressByCourseByUserService } from './services/get-latest-classes-inprogress-byCourse-byUser.service';

@Injectable()
export class UserService {
  constructor(
    private readonly createUser: CreateUSer,
    private readonly mailService: CreateMailService,
    private readonly getByIdUser: GetByIdUser,
    private readonly getLatestClassesInProgressByCourseByUserService:GetLatestClassesInProgressByCourseByUserService 
  ) {}

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

  async getLatestClassesInProgressByCourseByUser(id:number):Promise<User>{
    return this.getLatestClassesInProgressByCourseByUserService.getLatestClassesInProgressByUserByCourse(id) 
  }
}
