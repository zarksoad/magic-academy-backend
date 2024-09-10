import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Token } from '../../entities/token.entity';
import { Repository } from 'typeorm';
import { SendMailDto } from '../../dto';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(Token) private tokenRepository: Repository<Token>,
  ) {}

  async getToken(user: number, role: SendMailDto): Promise<string> {
    console.log('este es el role:' + role);
    const payload = {
      roleId: role.role,
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
