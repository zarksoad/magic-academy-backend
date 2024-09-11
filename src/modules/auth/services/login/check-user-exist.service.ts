/* eslint-disable no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './../../../user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

interface IcheckUserExist {
  checkUser(email: string): Promise<User>;
}

@Injectable()
export class CheckUserExistService implements IcheckUserExist {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  async checkUser(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException("The user hasn't been registered");
    }
    return user;
  }
}
