import { IUserTopics } from '../interfaces/user-topics.interface';

export const getUserTopicsIdsTransformer = (
  userTopics: IUserTopics,
): number[] => {
  return userTopics.topics.map(userTopic => userTopic.id);
};
