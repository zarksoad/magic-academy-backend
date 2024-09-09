/* eslint-disable no-unused-vars */
import {
  Controller,
  Post,
  Body,
  Res,
  HttpCode,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginAuthDto } from './dto/login.dto';
import { User } from '../user/entities';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { ApiPostOperation } from '../../common/decorators/swagger/post-swagger.decorator';
import { JwtAuthGuard } from './guards/jwt.auth.guard';

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

  @Post('logout')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  logoutUser(@Req() _req: Request, @Res() res: Response) {
    res.clearCookie('jwt', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });
    res.status(200).send({ message: 'succesfully logout' });
  }
}
