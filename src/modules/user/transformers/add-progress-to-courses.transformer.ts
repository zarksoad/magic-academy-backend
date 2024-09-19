import { GetStudentCoursesResponseDto } from "../dto/dto-output/get-student-courses-response.dto";
import { User } from "../entities";

export const addProgressToCoursesTransformer = (userCourses: User[]): GetStudentCoursesResponseDto[] => {
    return userCourses.map(useCourse => ({
        courseThumbnailUrl: useCourse["courseThumbnailUrl"],
        courseSlug: useCourse["courseSlug"],
        courseId: useCourse["courseId"],
        courseName: useCourse["courseName"],
        progress: -1
    }))
}