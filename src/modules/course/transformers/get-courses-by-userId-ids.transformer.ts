import { User } from '../../user/entities';

export const getCoursesByUserIdIdsTransformer = (coursesByUserId: User) => {
  return coursesByUserId.userCourses.map(userCourse => userCourse.id);
};
