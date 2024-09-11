/* eslint-disable no-unused-vars */
import { Injectable, ConflictException } from '@nestjs/common';
import { Topic } from '../../../topics/entities/topic.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class VerifyTopicCourseService {
  constructor(
    @InjectRepository(Topic)
    private readonly topicRepository: Repository<Topic>,
  ) {}

  async verifyTopics(topicIds: number[]): Promise<Topic[]> {
    if (topicIds.length === 0) {
      throw new ConflictException({
        status: 406,
        message: 'No topic IDs provided',
      });
    }

    const topics = await this.topicRepository.findByIds(topicIds);

    if (topics.length !== topicIds.length) {
      throw new ConflictException({
        status: 404,
        message: 'Some topic IDs are invalid or do not exist',
      });
    }

    return topics;
  }
}
