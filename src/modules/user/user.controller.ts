/* eslint-disable no-unused-vars */
import {
  Controller,
  Post,
  Body,
  UseGuards,
  Query,
  Headers,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { User } from './entities';
import { SendMailDto } from './dto';
import { ApiPostOperation } from '../../common/decorators/swagger';
import { UserId } from '../../common/decorators/user/user-Id.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';
import { FindRole } from './services';
import { Token } from './entities/token.entity';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly findRole: FindRole,
  ) {}

  @Post('register')
  @ApiPostOperation(
    'Create User', // Summary
    User, // Response DTO
    CreateUserDto, // Request DTO
    false, // Bearer Token (si se requiere autenticación)
  )
  async create(@Body() createUserDto: CreateUserDto, @Query() token: string) {
    return await this.userService.create(createUserDto, token);
  }

  @Post('/invite')
  @UseGuards(JwtAuthGuard)
  invite(@Body() sendMailDto: SendMailDto, @UserId() user: number) {
    console.log(user);
    return this.userService.sendEmail(sendMailDto, user);
  }
}
