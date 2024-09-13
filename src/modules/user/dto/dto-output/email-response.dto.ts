import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsString } from 'class-validator';

export class EmailResponseDto {
  @ApiProperty({ example: 201, description: 'Response status code' })
  code: number;

  @ApiProperty({ example: 'Created', description: 'Response message' })
  message: string;

  @ApiProperty({
    example: ['zarksoad@gmail.com'],
    description: 'List of accepted recipients',
  })
  @IsArray()
  @IsString({ each: true })
  accepted: string[];

  @ApiProperty({ example: [], description: 'List of rejected recipients' })
  @IsArray()
  @IsString({ each: true })
  rejected: string[];

  @ApiProperty({
    example: [
      'PIPELINING',
      'SIZE 48811212',
      'ETRN',
      'AUTH PLAIN LOGIN',
      'ENHANCEDSTATUSCODES',
      '8BITMIME',
      'DSN',
      'CHUNKING',
    ],
    description: 'EHLO response from the mail server',
  })
  @IsArray()
  @IsString({ each: true })
  ehlo: string[];

  @ApiProperty({
    example: 1758,
    description: 'Time taken to complete the envelope transaction',
  })
  @IsNumber()
  envelopeTime: number;

  @ApiProperty({ example: 684, description: 'Time taken to send the message' })
  @IsNumber()
  messageTime: number;

  @ApiProperty({ example: 1435, description: 'Size of the message in bytes' })
  @IsNumber()
  messageSize: number;

  @ApiProperty({
    example: '250 2.0.0 Ok: queued as 4X4SL70wfGzHB60w',
    description: 'Response from the mail server',
  })
  @IsString()
  response: string;

  @ApiProperty({
    example: '<dc563ea9-1755-efe7-0328-d7d8e86dfaec@shadowsystemstech.com>',
    description: 'Unique ID of the message',
  })
  @IsString()
  messageId: string;
}
