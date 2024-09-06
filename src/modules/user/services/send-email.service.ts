import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import type SMTPTransport from 'nodemailer/lib/smtp-transport';
import { SendMailDto } from '../dto/email-user.dto';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo>;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.hostinger.com',
      port: 465,
      secure: true,
      auth: {
        user: 'christian.pabon@shadowsystemstech.com',
        pass: 'Christian.pabon123',
      },
    });
  }

  async sendMail(sendMailDto: SendMailDto) {
    const { from, to, subject, text } = sendMailDto;

    const mailOptions = {
      from,
      to,
      subject,
      text,
    };

    return await this.transporter.sendMail(mailOptions);
  }
}
