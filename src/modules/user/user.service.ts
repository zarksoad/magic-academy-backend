/* eslint-disable no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateUSer, CreateMailService } from './services';
import { User } from './entities';
import { CreateUserDto, SendMailDto } from './dto';
import type SMTPTransport from 'nodemailer/lib/smtp-transport';

@Injectable()
export class UserService {
  constructor(
    private readonly createUser: CreateUSer,
    private readonly mailService: CreateMailService,
  ) {}

  async create(createUserDto: CreateUserDto, token?: string): Promise<User> {
    return await this.createUser.saveUser(createUserDto, token);
  }

  async sendEmail(
    sendEmailDto: SendMailDto,
    user: number,
  ): Promise<SMTPTransport.SentMessageInfo> {
    return await this.mailService.sendMail(sendEmailDto, user);
  }
}
