import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Course } from "../../course/entities/course.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class GetNumCompletedClassesInCourseService {
    constructor(
        @InjectRepository(Course) private readonly courseRepository: Repository<Course>
    ) { }

    async get(courseId: number): Promise<any> {
        // return await this.courseRepository.createQueryBuilder("courses")
        //     .innerJoinAndSelect("courses.")
        //     .getRawMany()
    }
}