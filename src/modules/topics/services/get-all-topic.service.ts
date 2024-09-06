import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Topic } from '../entities/topic.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GetAllTopic {
  constructor(
    @InjectRepository(Topic) private topicRepository: Repository<Topic>,
  ) {}
  async getAll(): Promise<Topic[]> {
    return await this.topicRepository.find();
  }
}
