/* eslint-disable no-unused-vars */
import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { User } from './entities';
import { ApiPostOperation } from 'src/common/decorators/swagger/post-swagger.decorator';

@ApiTags('users')
@Controller('register')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiPostOperation(
    'Create User', // Summary
    User, // Response DTO
    CreateUserDto, // Request DTO
    false, // Bearer Token (si se requiere autenticación)
  )
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
}
