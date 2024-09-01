/* eslint-disable no-unused-vars */
import { Injectable } from '@nestjs/common';
import { LoginService } from './services/login/login.service.service';

@Injectable()
export class AuthService {
  constructor(private readonly loginService: LoginService) {}
  async login(email: string, password: string) {
    return await this.loginService.checkingCredential(email, password);
  }
}
