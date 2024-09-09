import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Token } from '../../entities/token.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UpdateTokenStatus {
  constructor(
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
  ) {}
  async update(token: string): Promise<void> {
    await this.tokenRepository.update({ token }, { isUsed: true });
  }
}
