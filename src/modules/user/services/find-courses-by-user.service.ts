import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entities";
import { Repository } from "typeorm";

export class FindCoursesByUserIdService{
    constructor(
        @InjectRepository(User) private userRepository:Repository<User>
    ){}

    async findCoursesByUserId(id:number):Promise<User>{
        return this.userRepository.createQueryBuilder('users')
        .select([
            "users.name",
            "users.email",
            "users.avatarUrl",
            "users.roleId",
            "users.createdAt",
            "users.updatedAt",
            "courses.description",
            "courses.thumbnail_url",
            "courses.slug",
            "courses.published_at"])
        .innerJoinAndSelect('users.userCourses', 'user_courses')
        .innerJoinAndSelect('user_courses.course','courses')
        .where('users.id = :id', {id})
        .getOne()
    }
}