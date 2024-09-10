import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SendMailDto {
  @IsEmail()
  @IsNotEmpty()
  to: string;

  @IsNotEmpty()
  @IsString()
  role: string;
}
