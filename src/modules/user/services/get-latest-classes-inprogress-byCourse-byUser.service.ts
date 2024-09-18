import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { FindUserByIdService } from "./find-user-by-id.service";
import { UserClass } from "../entities/user-classes.entity";
import { User } from "../entities"
import { GetLatestClassesInProgressByCourseByUserResponseDto, GetLatestClassesInProgressByCourseByUserWithClassNumResponseDto } from "../dto/dto-output/get-latest-classes-inprogress-byCourse-byUser-output.dto";
import { addClassNumToLatestClassesTransformer } from "../transformers/add-class-num-to-latest-classes.transformer";
import { CourseService } from "../../course/course.service";
import { getClassesNumInCourse } from "../helpers/get-course-classes-ids.helper";

export class GetLatestClassesInProgressByCourseByUserService {

    constructor(
        @InjectRepository(UserClass) private userClassRepository: Repository<UserClass>,
        private findUserByIdService: FindUserByIdService,
        private courseService: CourseService
    ) { }

    async getLatestClassesInProgressByUserByCourse(id: number): Promise<GetLatestClassesInProgressByCourseByUserResponseDto[]>
    // Promise<SectionClass>{
    {
        const { id: userId } = await this.findUserByIdService.findUserById(id);

        // Subquery that filters by class with the latest updated date per course
        const createSubQuery = (qb) => {
            return qb
                .subQuery()
                .select("MAX(user_classes.updated_at)", "max_updated_at")
                .from(UserClass, "user_classes")
                .innerJoin("user_classes.sectionClasses", "section_classes")
                .innerJoin("section_classes.courseSection", "course_sections")
                .innerJoin("course_sections.course", "courses")
                .groupBy("courses.id")
                .getQuery();
        };

        // Query to find all the classes "IN_PROGRESS" of the courses associated to a user
        return await this.userClassRepository
            .createQueryBuilder("user_classes")
            .innerJoinAndSelect("user_classes.sectionClasses", "section_classes")
            .innerJoinAndSelect("section_classes.courseSection", "course_sections")
            .innerJoinAndSelect("course_sections.course", "courses")
            .where("user_classes.users_id = :userId", { userId })
            .andWhere("user_classes.status = :status", { status: "IN PROGRESS" })
            .andWhere(qb => {
                const subQuery = createSubQuery(qb);
                return `user_classes.updated_at IN (${subQuery})`;
            })
            .select([
                "user_classes.status AS userClassStatus",
                "section_classes.title AS sectionClassTitle",
                "section_classes.id AS sectionClassId",
                "course_sections.name AS courseSectionName",
                "courses.id AS courseId",
                "courses.name AS courseName"
            ])
            .getRawMany();

    }


    async withClassNum(id: number): Promise<GetLatestClassesInProgressByCourseByUserWithClassNumResponseDto[]> {
        const latestClasses = await this.getLatestClassesInProgressByUserByCourse(id)

        const latestClassesWithClassNum = addClassNumToLatestClassesTransformer(latestClasses)

        // Calculating and Inserting numClassInCourse and numClassesInCourse
        await Promise.all(
            latestClassesWithClassNum.map(async (latestClassWithClassNum) => {
                const courseId = latestClassWithClassNum['courseId'];
                const classId = latestClassWithClassNum["sectionClassId"];

                const classCourses = await this.courseService.FindCourseClasses(courseId);

                const { numClassInCourse, numClassesInCourse } = await getClassesNumInCourse(classCourses, classId);

                latestClassWithClassNum.numClassesInCourse = numClassesInCourse;
                latestClassWithClassNum.numClassInCourse = numClassInCourse;
            }));

        return latestClassesWithClassNum
    }
}