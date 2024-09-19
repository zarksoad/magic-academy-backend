import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { UserCourse } from "../entities/user-course.entity";

@Injectable()
export class GetCompletedClassesInCourseService {
    constructor(
        @InjectRepository(UserCourse) private readonly userCoursesRepository: Repository<UserCourse>
    ) { }

    async get(userId: number, courseId: number): Promise<any> {
        return await this.userCoursesRepository.createQueryBuilder("user_courses")
            .innerJoinAndSelect("user_courses.course", "courses")
            .innerJoinAndSelect("courses.sections", "course_sections")
            .innerJoinAndSelect("course_sections.classes", "section_classes")
            .innerJoinAndSelect("section_classes.userClass", "user_classes")
            .where("user_courses.users_id = :userId", { userId })
            .andWhere("courses.id = :courseId", { courseId })
            .andWhere("user_classes.status = :status", { status: "COMPLETED" })
            .select([
                "user_courses.users_id AS userId",
                "user_courses.courses_id AS courseId",
                "section_classes.title AS courseClassTitle",
                "section_classes.id AS courseClassId",
                "user_classes.status AS userClassStatus",
            ])
            .getRawMany()
    }
}