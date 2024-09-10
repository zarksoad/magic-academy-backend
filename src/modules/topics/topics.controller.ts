/* eslint-disable no-unused-vars */
import { Controller, Post, Body, Get } from '@nestjs/common';
import { TopicsService } from './topics.service';
import { CreateTopicDto } from './dto/create-topic.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiPostOperation } from '../../common/decorators/swagger';
import { ApiGetOperation } from '../../common/decorators/swagger/get-swagger.decorator';

@ApiTags('Topics')
@Controller('topics')
export class TopicsController {
  constructor(private readonly topicsService: TopicsService) {}

  @Post()
  @ApiPostOperation('Create Topic', CreateTopicDto, CreateTopicDto, false)
  create(@Body() createTopicDto: CreateTopicDto) {
    return this.topicsService.create(createTopicDto);
  }

  @Get()
  @ApiGetOperation('Topics', CreateTopicDto, true)
  findAll() {
    return this.topicsService.findAll();
  }
}
