import { Injectable } from "@nestjs/common";
import { FindCoursesByUserIdService } from "./find-courses-by-user.service";
import { GetStudentCoursesResponseDto } from "../dto/dto-output/get-student-courses-response.dto";
import { FindUserByIdService } from "./find-user-by-id.service";
import { addProgressToCoursesTransformer } from "../transformers/add-progress-to-courses.transformer";
import { GetCourseProgressService } from "./get-course-progress.service";

@Injectable()
export class FindUserCoursesAndProgressService {
    constructor(
        private readonly findUserByIdService: FindUserByIdService,
        private readonly findCoursesByUserIdService: FindCoursesByUserIdService,
        private readonly getCourseProgressService: GetCourseProgressService
    ) { }

    async findUserCoursesAndProgress(id: number)
        : Promise<GetStudentCoursesResponseDto[]> {
        // Checking whether the user exists or not
        const { id: studentId } = await this.findUserByIdService.findUserById(id);

        const userCourses = await this.findCoursesByUserIdService.findCoursesByUserIdWithClasses(studentId)

        // Adding "progress" property to courses
        const userCoursesProgress = addProgressToCoursesTransformer(userCourses)

        // //Calculating and inserting progress
        await Promise.all(
            userCoursesProgress.map(async (userCourseProgress) => {
                // Getting user progress for a course
                // userCourseProgress.progress = 
                const progress = this.getCourseProgressService.getCourseProgress(userCourseProgress.courseId)
                console.log(progress)
            })
        );

        return userCoursesProgress
    }
}