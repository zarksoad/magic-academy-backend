/* eslint-disable no-unused-vars */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { MatchPassword } from './check-password.service';
import { CheckUserExistService } from './check-user-exist.service';
import { GenerateToken } from './create-token.service';
import { loginAuthDto } from '../../dto/login.dto';

// Interface defining the contract for the LoginService
interface ILoginService {
  checkingCredential({
    email,
    password,
  }: loginAuthDto): Promise<{ access_token: string }>;
}

@Injectable()
export class LoginService implements ILoginService {
  constructor(
    private readonly matchPassword: MatchPassword,
    private readonly userValidator: CheckUserExistService,
    private readonly generateToken: GenerateToken,
  ) {}

  async checkingCredential({
    email,
    password,
  }: loginAuthDto): Promise<{ access_token: string }> {
    // Check if the user exists
    const user = await this.userValidator.checkUser(email);

    // If user does not exist, throw UnauthorizedException
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    // Check if the provided password is correct
    const checkingPassword = await this.matchPassword.checkingPassword(
      password,
      user.password,
    );

    // If the password is incorrect, throw UnauthorizedException
    if (!checkingPassword) {
      throw new UnauthorizedException('Invalid user or password');
    }

    // Generate the token
    const { access_token } = await this.generateToken.token(
      user.id,
      user.roleId,
    );

    // Return the token in the expected format
    return { access_token };
  }
}
