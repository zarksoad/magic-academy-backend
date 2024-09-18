import { InjectRepository } from "@nestjs/typeorm"
import { SectionClass } from "../entities/section-class.entity"
import { Repository } from "typeorm"

export class GetClassNumInCourseService{
    constructor(
        @InjectRepository(SectionClass) private readonly sectionClassRepository:Repository<SectionClass>
    ){}

    async getClassNumInCourse(classId:number):Promise<any>{
        //TODO: VALIDATE WHETHER THE CLASS EXISTS OR NOT. CHRIS HAS DONE THIS SERVICE ALREADY
        return await this.sectionClassRepository.createQueryBuilder("section_classes").innerJoinAndSelect("section_classes.courseSection", "course_sections")
        .innerJoinAndSelect("course_sections.course", "courses")
        .where("section_classes.id = :classId", { classId }).select(["courses.id"]).getMany();
    }
}