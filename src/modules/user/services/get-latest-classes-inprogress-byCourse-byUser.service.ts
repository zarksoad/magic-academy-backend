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

        // Function to create the subquery
        const createSubQuery = (qb) => {
        return qb
            .subQuery()
            .select("MAX(uc2.updated_at)", "max_updated_at")
            .from(UserClass, "uc2")
            .innerJoin("uc2.sectionClass", "sc2")
            .innerJoin("sc2.courseSection", "cs2")
            .innerJoin("cs2.course", "c2")
            .groupBy("c2.id")
            .getQuery();
        };

        // Main query using QueryBuilder
        const result = await this.userClassRepository
        .createQueryBuilder("user_classes")
        .innerJoinAndSelect("user_classes.sectionClasses", "section_classes")
        .innerJoinAndSelect("section_classes.courseSection", "course_sections")
        .innerJoinAndSelect("course_sections.course", "courses")
        .where("user_classes.users_id = :userId", { userId })
        .andWhere(qb => {
            const subQuery = createSubQuery(qb);
            return `uc.updated_at IN (${subQuery})`;
        })
        .select([
            "uc.users_id",
            "uc.status AS user_class_status",
            "uc.updated_at AS user_class_updated_at",
            "sc.title AS section_class_title",
            "cs.name AS course_section_name",
            "c.name AS course_name",
            "c.description AS course_description"
        ])
        .getRawMany();
        console.log("result: ", result)
        return result
    }
}