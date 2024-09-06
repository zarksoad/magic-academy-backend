import { Injectable } from '@nestjs/common';
import { CreateTopicDto } from './dto/create-topic.dto';
import { CreateTopics } from './services';
import { Topic } from './entities/topic.entity';
import { GetAllTopic } from './services/get-all-topic.service';

@Injectable()
export class TopicsService {
  constructor(
    private readonly createTopic: CreateTopics,
    private readonly getAllTopics: GetAllTopic,
  ) {}

  async create(createTopicDto: CreateTopicDto): Promise<Topic> {
    return await this.createTopic.saveTopic(createTopicDto);
  }
  async findAll(): Promise<Topic[]> {
    return await this.getAllTopics.getAll();
  }
}
