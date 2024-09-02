import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  // eslint-disable-next-line no-unused-vars
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async LoginUser(@Body() body: { email: string; password: string }) {
    const { email, password } = body;
    return await this.authService.login(email, password);
  }
}
