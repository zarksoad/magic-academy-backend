/* eslint-disable no-unused-vars */
import { Controller, Post, Body, Res, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginAuthDto } from './dto/login.dto';
import { ApiPostOperation } from 'src/common/decorators/swagger';
import { User } from '../user/entities';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('login')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiPostOperation('login successfully', User, loginAuthDto, false)
  @HttpCode(200)
  async LoginUser(@Body() body: loginAuthDto, @Res() response: Response) {
    // Extract email and password from the request body
    const { email, password } = body;

    // Call the authentication service to obtain the JWT token
    const { access_token } = await this.authService.login({ email, password });

    // Set the JWT cookie in the response
    response.cookie('jwt', access_token, {
      httpOnly: true, // Helps protect against XSS attacks
      secure: process.env.NODE_ENV === 'production', // Ensures cookie is sent over HTTPS in production
      sameSite: 'strict', // Mitigates CSRF attacks
    });
    return response.send({
      status: 200,
      message: 'Logged in successfully',
    });
  }
}
