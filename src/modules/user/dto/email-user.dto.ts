import { IsEmail, IsNotEmpty } from 'class-validator';

export class SendMailDto {
  @IsEmail()
  @IsNotEmpty()
  to: string;
}
