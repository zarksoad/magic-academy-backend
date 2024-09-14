import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Token } from '../entities/token.entity';
import { Repository } from 'typeorm';
import { User } from '../entities';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(Token) private tokenRepository: Repository<Token>,
  ) {}

  async getToken(user: User): Promise<string> {
    const payload = {
      roleId: 3,
    };
    const token = this.jwtService.sign(payload);

    await this.tokenRepository.save({
      createdBy: user.id,
      isUsed: false,
    });
    return token;
  }
}
