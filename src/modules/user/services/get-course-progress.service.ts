import { Injectable } from "@nestjs/common";
import { getClassesNumInCourse } from "../helpers/get-course-classes-ids.helper";
import { CourseService } from "../../course/course.service";
import { GetCompletedClassesInCourseService } from "./get-num-completed-classes-in-course.service";

@Injectable()
export class GetCourseProgressService {
    constructor(
        private readonly courseService: CourseService,
        private readonly getCompletedClassesInCourseService: GetCompletedClassesInCourseService
    ) { }

    async getCourseProgress(userId: number, courseId: number): Promise<number> {

        const classCourses = await this.courseService.FindCourseClasses(courseId);

        const { numClassesInCourse } = await getClassesNumInCourse(classCourses)

        const completedClasses = await this.getCompletedClassesInCourseService.get(userId, courseId)

        return Math.round((completedClasses.length / numClassesInCourse) * 100) / 100
    }
}