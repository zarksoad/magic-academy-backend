import { Module } from '@nestjs/common';
import { TopicsService } from './topics.service';
import { TopicsController } from './topics.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Topic } from './entities/topic.entity';
import { CreateTopics, GetAllTopic, VerifyTopicExist } from './services';
import { InserTopicService } from './services/topic-insert.service';
@Module({
  imports: [
    TypeOrmModule.forFeature([Topic])
  ],
  controllers: [TopicsController],
  providers: [
    TopicsService,
    CreateTopics,
    VerifyTopicExist,
    GetAllTopic,
    InserTopicService,
  ],
  exports: [InserTopicService],
})
export class TopicsModule {}
