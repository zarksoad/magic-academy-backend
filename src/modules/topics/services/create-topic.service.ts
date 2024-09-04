/* eslint-disable no-unused-vars */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Topic } from '../entities/topic.entity';
import { Repository } from 'typeorm';
import { VerifyTopicExist } from './verify-topic.service';
import { CreateTopicDto } from '../dto/create-topic.dto';

@Injectable()
export class CreateTopics {
  constructor(
    @InjectRepository(Topic) private topicRepository: Repository<Topic>,
    private readonly verifyTopic: VerifyTopicExist,
  ) {}
  async saveTopic(topicData: CreateTopicDto): Promise<Topic> {
    await this.verifyTopic.checkTopic(topicData.name);
    const topic = this.topicRepository.create(topicData);
    return await this.topicRepository.save(topic);
  }
}
