import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entities";
import { Repository } from "typeorm";
import { UserCourse } from "../entities/user-course.entity";

export class FindCoursesByUserIdService {

    private coursecolumns2Query: string[];
    private classColumns2Query: string[];

    constructor(
        @InjectRepository(User) private userRepository: Repository<User>
    ) {
        this.coursecolumns2Query = [
            "users.name",
            "users.email",
            "users.avatarUrl",
            "users.roleId",
            "users.createdAt",
            "users.updatedAt",
            "courses.description",
            "courses.thumbnail_url",
            "courses.slug",
            "courses.published_at"
        ]

        this.classColumns2Query = [
            "users.name",
            "courses.name",
            "courses.thumbnail_url",
            "courses.slug",
            "courses.published_at"
        ]
    }

    async findCoursesByUserId(id: number): Promise<User> {

        return this.userRepository.createQueryBuilder('users')
            .select(this.coursecolumns2Query)
            .innerJoinAndSelect('users.userCourses', 'user_courses')
            .innerJoinAndSelect('user_courses.course', 'courses')
            .where('users.id = :id', { id })
            .getOne()
    }

    async findCoursesByUserIdWithClasses(id: number): Promise<User[]> {

        return await this.userRepository.createQueryBuilder('users')
            .innerJoinAndSelect('users.userCourses', 'user_courses')
            .innerJoinAndSelect('user_courses.course', 'courses')
            .where('users.id = :id', { id })
            .select([
                "courses.id AS courseId",
                "courses.name AS courseName",
                "courses.thumbnail_url AS courseThumbnailUrl",
                "courses.slug AS courseSlug"
            ])
            .getRawMany()
    }
}