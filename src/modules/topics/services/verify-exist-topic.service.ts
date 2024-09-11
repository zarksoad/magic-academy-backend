/* eslint-disable no-unused-vars */
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Topic } from '../entities/topic.entity';
import { Repository } from 'typeorm';
import { In } from 'typeorm';

@Injectable()
export class TopicExist {
  constructor(
    @InjectRepository(Topic)
    private readonly topicRepository: Repository<Topic>,
  ) {}
  async checkTopicExist(topicIds: number[]): Promise<void> {
    const topics = await this.topicRepository.findBy({ id: In(topicIds) });
    if (topics.length !== topicIds.length) {
      throw new ConflictException({
        status: 406,
        message: 'Some topic IDs are invalid or do not exist',
      });
    }
  }
}
