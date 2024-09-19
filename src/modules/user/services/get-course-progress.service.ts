import { Injectable } from "@nestjs/common";
import { getClassesNumInCourse } from "../helpers/get-course-classes-ids.helper";
import { CourseService } from "../../course/course.service";
import { GetNumCompletedClassesInCourseService } from "./get-num-completed-classes-in-course.service";

@Injectable()
export class GetCourseProgressService {
    constructor(
        private readonly courseService: CourseService,
        private readonly getNumCompletedClassesInCourseService: GetNumCompletedClassesInCourseService
    ) { }

    async getCourseProgress(courseId: number): Promise<any> {

        const classCourses = await this.courseService.FindCourseClasses(courseId);

        const { numClassesInCourse } = await getClassesNumInCourse(classCourses)

        const numCompletedClasses = await this.getNumCompletedClassesInCourseService.get(courseId)

        console.log("numCompletedClasses: ", numCompletedClasses)

        // return numCompletedClasses / numClassesInCourse
    }
}