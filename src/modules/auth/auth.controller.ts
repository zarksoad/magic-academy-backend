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
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { ApiPostOperation } from '../../common/decorators/swagger/post-swagger.decorator';
import { JwtAuthGuard } from './guards/jwt.auth.guard';
import { LoginResponseDto } from './dto/login-response.dto';

@ApiTags('login')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiPostOperation('login successfully', LoginResponseDto, loginAuthDto, false)
  @HttpCode(200)
  async LoginUser(@Body() body: loginAuthDto) {
    // Extract email and password from the request body
    const { email, password } = body;
    // Call the authentication service to obtain the JWT token
    return await this.authService.login({ email, password });
  }

  @Post('logout')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  logoutUser(@Req() _req: Request, @Res() res: Response) {
    res.status(200).send({ message: 'Successfully logged out' });
  }
}
