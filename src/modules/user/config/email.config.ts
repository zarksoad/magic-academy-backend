import type SMTPTransport from 'nodemailer/lib/smtp-transport';
import * as nodemailer from 'nodemailer';
import { EnvMailConfig } from './env.mail.config';

export class MailConfig {
  protected transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo>;
  constructor() {
    // console.log(EnvMailConfig());
    this.transporter = nodemailer.createTransport({
      host: EnvMailConfig().host,
      port: EnvMailConfig().port,
      auth: {
        user: EnvMailConfig().user,
        pass: EnvMailConfig().pass,
      },
    });
  }
}
