/* eslint-disable no-unused-vars */
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { BcryptPasswordHasher } from './hash-password.service';
import { FindRole } from './find-role.service';
import { CheckEmailExistService } from './check-user-exist-register.service';
import { Topic } from '../../topics/entities/topic.entity';

@Injectable()
export class CreateUSer {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Topic) private topicRepository: Repository<Topic>,
    private readonly cryptPassword: BcryptPasswordHasher,
    private readonly findRole: FindRole,
    private readonly verifyEmail: CheckEmailExistService,
  ) {}
  async saveUser(userData: CreateUserDto, token?: string): Promise<User> {
    const password = userData.password;
    userData.password = await this.cryptPassword.hash(password, 10);
    let roleId = 1; // Default roleId for student
    await this.verifyEmail.checkUser(userData.email);

    if (token) {
      try {
        const role = await this.findRole.getRoleFromToken(token);
        roleId = role.id;
      } catch (error) {
        throw new Error('Invalid token or role not found');
      }
    }
    const topics = await this.topicRepository.findByIds(userData.topicIds);
    if (topics.length === 0 && userData.topicIds.length > 0) {
      throw new ConflictException({
        status: 406,
        message: 'Some topic IDs are invalid or do not exist',
      });
    }

    const user = this.userRepository.create({
      ...userData,
      roleId,
      topics,
    });
    return await this.userRepository.save(user);
  }
}
