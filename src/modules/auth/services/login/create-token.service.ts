/* eslint-disable no-unused-vars */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

interface ITokenGenerator {
  token(
    // eslint-disable-next-line no-unused-vars
    id: number,
    roleId: number,
  ): Promise<{ message: string; access_token: string }>;
}

@Injectable()
export class GenerateToken implements ITokenGenerator {
  constructor(private jwtService: JwtService) {}

  async token(
    id: number,
    roleId: number,
  ): Promise<{ message: string; access_token: string }> {
    const payload = { userId: id, roleId: roleId };
    const access_token = await this.jwtService.signAsync(payload);
    return {
      message: 'This is your token',
      access_token: access_token,
    };
  }
}
