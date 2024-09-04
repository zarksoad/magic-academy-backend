/* eslint-disable no-unused-vars */
import { Injectable } from '@nestjs/common';
import { LoginService } from './services/login/login.service.service';
import { loginAuthDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private readonly loginService: LoginService) {}
  async login({ email, password }: loginAuthDto) {
    return await this.loginService.checkingCredential({ email, password });
  }
}
