import { Injectable } from '@nestjs/common';
import { FindUserByIdService } from '../../user/services/find-user-by-id.service';
import { FindUserTopicsService } from '../../user/services/find-user-topics.service';
import { getUserTopicsIds } from '../adapters/get-user-topics-ids.adapter';
import { Course } from '../entities/course.entity';

@Injectable()
export class FindUserRecommendedCoursesService {
  constructor(
    private findUserByIdService: FindUserByIdService,
    private findUserTopicsService: FindUserTopicsService,
  ) {}

  async FindUserRecommendedCourses(id: string): Promise<number[]> {
    const { id: UserId } = await this.findUserByIdService.findUserById(id);

    //Getting topics by user
    const topicsByUser =
      await this.findUserTopicsService.FindTopicsByUser(UserId);

    const userTopicIds = getUserTopicsIds(topicsByUser);

    //Getting courses related to topics
    // const recommendedCourses =

    return userTopicIds;
  }
}
