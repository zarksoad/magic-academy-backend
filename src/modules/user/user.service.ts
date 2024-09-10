/* eslint-disable no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateUSer, CreateMailService } from './services';
import { CreateUSer, CreateMailService } from './services';
import { User } from './entities';
import { CreateUserDto, SendMailDto } from './dto';
import type SMTPTransport from 'nodemailer/lib/smtp-transport';
import { UpdateTokenStatus } from './services/email/update-token-status.service';
import { CreateUserDto, SendMailDto } from './dto';
import type SMTPTransport from 'nodemailer/lib/smtp-transport';
import { UpdateTokenStatus } from './services/email/update-token-status.service';

@Injectable()
export class UserService {
  constructor(
    private readonly createUser: CreateUSer,
    private readonly mailService: CreateMailService,
    // private readonly updateTokenStatus: UpdateTokenStatus,
  ) {}

  async create(createUserDto: CreateUserDto, token?: string): Promise<User> {
    if (token) {
      // await this.updateTokenStatus.update(token);
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
}
