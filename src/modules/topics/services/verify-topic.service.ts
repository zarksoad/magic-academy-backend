/* eslint-disable no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Topic } from '../entities/topic.entity';
import { Repository } from 'typeorm';

interface ICheckTopic {
  checkTopic(name: string): Promise<string>;
}

@Injectable()
export class VerifyTopicExist implements ICheckTopic {
  constructor(
    @InjectRepository(Topic)
    private readonly topicRepository: Repository<Topic>,
  ) {}
  async checkTopic(name: string): Promise<string> {
    const topic = await this.topicRepository.findOne({ where: { name } });
    if (topic) {
      throw new NotFoundException('The topic already exists');
    }
    return name;
  }
}
