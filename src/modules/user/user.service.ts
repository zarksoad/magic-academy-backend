/* eslint-disable no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateUSer } from './services';
import { User } from './entities';
import { MailService } from './services/send-email.service';
import { CreateUserDto, SendMailDto } from './dto';
import type SMTPTransport from 'nodemailer/lib/smtp-transport';

@Injectable()
export class UserService {
  constructor(
    private readonly createUser: CreateUSer,
    private readonly mailService: MailService,
  ) {}

  async create(createUserDto: CreateUserDto, token?: string): Promise<User> {
    return await this.createUser.saveUser(createUserDto, token);
  }

  async sendEmail(
    sendEmailDto: SendMailDto,
  ): Promise<SMTPTransport.SentMessageInfo> {
    return await this.mailService.sendMail(sendEmailDto);
  }
}
