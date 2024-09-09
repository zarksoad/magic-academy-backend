import { Injectable } from '@nestjs/common';
import { SendMailDto } from '../../dto/email-user.dto';
import { MailConfig } from '../../config/email.config';
import Mail from 'nodemailer/lib/mailer';
import { EnvMailConfig } from '../../config/env.mail.config';
import { templateTestEmailWithToken } from '../../mails/invitation.template';
import { TokenService } from './create-role-token.service';
import { User } from '../../entities';

@Injectable()
export class CreateMailService extends MailConfig {
  constructor(private readonly tokenService: TokenService) {
    super();
  }

  async sendMail(sendMailDto: SendMailDto, user: number) {
    const { to } = sendMailDto;

    const token = await this.tokenService.getToken(user);
    const mailOptions: Mail.Options = {
      from: EnvMailConfig().user,
      to,
      subject: 'Invitation to Join as a Collaborator on the Magic Platform',
      html: templateTestEmailWithToken(token),
    };

    return await this.transporter.sendMail(mailOptions);
  }
}
