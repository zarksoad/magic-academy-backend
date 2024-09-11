import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities';
import { Repository } from 'typeorm';

@Injectable()
export class GetByIdUser {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findByIdUser(id: number): Promise<Omit<User, 'password'>> {
    const user = await this.userRepository.findOne({
      where: { id },
      select: ['id', 'name', 'avatarUrl', 'createdAt', 'updatedAt'],
      relations: ['topics'],
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
