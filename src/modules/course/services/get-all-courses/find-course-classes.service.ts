import { InjectRepository } from "@nestjs/typeorm";
import { Course } from "../../entities/course.entity";
import { Repository } from "typeorm";

export class FindAllCourseClassesService{
    constructor(
        @InjectRepository(Course) private readonly courseRepository:Repository<Course>
    ){}

    async FindCourseClasses(course_id:number):Promise<Course>{
        const result  = await this.courseRepository.createQueryBuilder("courses")
        .innerJoinAndSelect("courses.sections", "course_sections")
        .innerJoinAndSelect("course_sections.classes", "section_classes")
        .where("courses.id = :course_id", { course_id }).orderBy('section_classes.id', 'ASC')
        .getOne()

        return result
    }
}