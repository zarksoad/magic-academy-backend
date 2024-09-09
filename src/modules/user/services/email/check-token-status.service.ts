import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Token } from '../../entities/token.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CheckTokenStatus {
  constructor(
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
  ) {}

  async checkToken(token: string): Promise<void> {
    const tokenData = await this.tokenRepository.findOne({ where: { token } });
    console.log(tokenData.isUsed);
    if (tokenData.isUsed) {
      throw new UnauthorizedException('The token has already been used');
    }
  }
}
