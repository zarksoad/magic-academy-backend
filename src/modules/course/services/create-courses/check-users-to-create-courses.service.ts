/* eslint-disable no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../../../user/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ICheckUserExist } from '../../interfaces/check-user-exist.interface';
/* eslint-disable @typescript-eslint/no-unused-vars */

@Injectable()
export class CheckUserExistServiceCourse implements ICheckUserExist {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async checkUser(userId: number): Promise<User[]> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return [user];
  }
}
