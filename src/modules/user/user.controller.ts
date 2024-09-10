/* eslint-disable no-unused-vars */
import { Controller, Post, Body, UseGuards, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { User } from './entities';
import { SendMailDto } from './dto';
import { ApiPostOperation } from '../../common/decorators/swagger';
import { UserId } from '../../common/decorators/user/user-Id.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';
import { CheckTokenStatus } from './services/email/check-token-status.service';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly checkTokenStatus: CheckTokenStatus,
  ) {}

  @Post('register')
  @ApiPostOperation(
    'Create User', // Summary
    CreateUserDto, // Response DTO
    CreateUserDto, // Request DTO
    false, // Bearer Token (si se requiere autenticación)
  )
  async create(@Body() createUserDto: CreateUserDto, @Query() token?: string) {
    const tokenDesectructur = token['token'];
    console.log(tokenDesectructur);
    if (tokenDesectructur) {
      await this.checkTokenStatus.checkToken(tokenDesectructur);
      return await this.userService.create(createUserDto, tokenDesectructur);
    }

    return await this.userService.create(createUserDto);
  }

  @Post('/invite')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(3)
  @ApiPostOperation('Invite User', User, SendMailDto, true)
  invite(@Body() sendMailDto: SendMailDto, @UserId() user: number) {
    return this.userService.sendEmail(sendMailDto, user);
  }
}
