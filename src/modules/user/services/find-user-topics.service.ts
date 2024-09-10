import { ConflictException, Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { User } from "../entities"
import { Repository } from "typeorm"

@Injectable()
export class FindUserTopicsService{
    constructor(
        @InjectRepository(User) private userRepository:Repository<User>
    ){}

    async FindTopicsByUser(id:number):Promise<User>{
        
        const topicsByUser = await this.userRepository.createQueryBuilder("users").innerJoinAndSelect("users.topics", "topics").select(['topics.name', 'topics.id', 'users.name', 'users.id']).where("users.id = :id", {id}).getOne()
        
        if(!topicsByUser.topics.length){
            throw new ConflictException({
                status: 400,
                message: "The user has no topics"
            })
        }

        return topicsByUser
    }
}