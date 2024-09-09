import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Token } from '../../entities/token.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(Token) private tokenRepository: Repository<Token>,
  ) {}

  async getToken(user: number): Promise<string> {
    const payload = {
      roleId: 2,
    };
    const token = await this.jwtService.signAsync(payload);

    await this.tokenRepository.save({
      token,
      createdBy: user,
      isUsed: false,
    });

    return token;
  }
}
