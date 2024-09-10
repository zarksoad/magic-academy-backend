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
import { UpdateTokenStatus } from './email/update-token-status.service';
import { TopicExist } from '../../topics/services/verify-exist-topic.service';
import { In } from 'typeorm';
@Injectable()
export class CreateUSer {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Topic) private topicRepository: Repository<Topic>,
    private readonly cryptPassword: BcryptPasswordHasher,
    private readonly findRole: FindRole,
    private readonly verifyEmail: CheckEmailExistService,
    private readonly updateTokenStatus: UpdateTokenStatus,
    private readonly topicExists: TopicExist,
  ) {}
  async saveUser(userData: CreateUserDto, token?: string): Promise<User> {
    const password = userData.password;
    userData.password = await this.cryptPassword.hash(password, 10);
    let roleId = 1; // Default roleId for student
    await this.verifyEmail.checkUser(userData.email);

    const topics = await this.topicRepository.findBy({
      id: In(userData.topicIds),
    });
    if (topics.length === 0 && userData.topicIds.length > 0) {
      throw new ConflictException({
        status: 406,
        message: 'Some topic IDs are invalid or do not exist',
      });
    }

    await this.topicExists.checkTopicExist(userData.topicIds);

    if (token) {
      try {
        const role = await this.findRole.getRoleFromToken(token);
        await this.updateTokenStatus.update(token);
        roleId = role.id;
      } catch (error) {
        throw new Error('Invalid token or role not found');
      }
    }
    const defaultAvatarUrl =
      'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541';
    const avatarUrl = userData.avatarUrl || defaultAvatarUrl;

    const user = this.userRepository.create({
      ...userData,
      roleId,
      avatarUrl,
      topics,
    });
    return await this.userRepository.save(user);
  }
}
