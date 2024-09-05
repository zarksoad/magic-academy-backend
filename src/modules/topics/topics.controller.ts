/* eslint-disable no-unused-vars */
import { Controller, Post, Body, Get } from '@nestjs/common';
import { TopicsService } from './topics.service';
import { CreateTopicDto } from './dto/create-topic.dto';
import { ApiPostOperation } from 'src/common/decorators/swagger';
import { Topic } from './entities/topic.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Topics')
@Controller('topics')
export class TopicsController {
  constructor(private readonly topicsService: TopicsService) {}

  @Post()
  @ApiPostOperation('Create Topic', Topic, CreateTopicDto, false)
  create(@Body() createTopicDto: CreateTopicDto) {
    return this.topicsService.create(createTopicDto);
  }

  @Get()
  findAll() {
    return this.topicsService.findAll();
  }
}
