import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SendMailDto {
  @ApiProperty({ example: 'johndoe@example.com' })
  @IsEmail()
  @IsNotEmpty()
  to: string;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsString()
  role: string;
}
