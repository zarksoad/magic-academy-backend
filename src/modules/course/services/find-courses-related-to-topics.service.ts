import { InjectRepository } from "@nestjs/typeorm";
import { Topic } from "../../topics/entities/topic.entity";
import { Repository } from "typeorm";
import { Course } from "../entities/course.entity";

export class FindCoursesRelatedToTopicsService{
    constructor(
        @InjectRepository(Course) private courseRepository:Repository<Course>
    ){}

    async FindCoursesRelatedToTopics(topicsIds:number[]):Promise<Course[]>{
        
        const coursesRelatedToTopics = await this.courseRepository.createQueryBuilder("courses")
        .select([
            'topics.id',
            'topics.name',
            'courses.id',
            'courses.name'
        ])
        .innerJoin("courses.topics", "topics").where("topics.id IN(:...ids)", {ids:topicsIds})
        .getMany();
        
        return coursesRelatedToTopics
    }
}