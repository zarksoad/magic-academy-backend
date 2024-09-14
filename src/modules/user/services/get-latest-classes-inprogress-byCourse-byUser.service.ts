import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { FindUserByIdService } from "./find-user-by-id.service";
import { UserClass } from "../entities/user-classes.entity";

export class GetLatestClassesInProgressByCourseByUserService{

    constructor(
        @InjectRepository(UserClass) private userClassRepository: Repository<UserClass>,
        private findUserByIdService:FindUserByIdService
    ){}

    async getLatestClassesInProgressByUserByCourse(id:number):Promise<any>
    // Promise<SectionClass>{
    {
        const {id:userId} = await this.findUserByIdService.findUserById(id);

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
        .andWhere("user_classes.status = :status", {status:"IN PROGRESS"})
        .andWhere(qb => {
            const subQuery = createSubQuery(qb);
            return `user_classes.updated_at IN (${subQuery})`;
        })
        .select([
            "user_classes.users_id",
            "user_classes.status AS user_class_status",
            "user_classes.updated_at AS user_class_updated_at",
            "section_classes.title AS section_class_title",
            "course_sections.name AS course_section_name",
            "courses.name AS course_name",
            "courses.description AS course_description"
        ])
        .getRawMany();

    }
}