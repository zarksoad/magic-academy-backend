import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginAuthDto } from './dto/login.dto';
import { ApiPostOperation } from 'src/common/decorators/swagger';
import { User } from '../user/entities';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('login')
@Controller('auth')
export class AuthController {
  // eslint-disable-next-line no-unused-vars
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiPostOperation('login successfully', User, loginAuthDto, false)
  async LoginUser(@Body() body: { email: string; password: string }) {
    const { email, password }: loginAuthDto = body;
    return await this.authService.login({ email, password });
  }
}
