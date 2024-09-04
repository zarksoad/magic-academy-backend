import { Injectable } from '@nestjs/common';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { CreateTopics } from './services';
import { Topic } from './entities/topic.entity';

@Injectable()
export class TopicsService {
 constructor(private readonly createTopic: CreateTopics){}

 async create(createTopicDto: CreateTopicDto): Promise<Topic>{
  return await this.createTopic.saveTopic(createTopicDto);
 }
}
