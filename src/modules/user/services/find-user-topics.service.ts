import { ConflictException, Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { User } from "../entities"
import { Repository } from "typeorm"

@Injectable()
export class FindUserTopicsService{
    constructor(
        @InjectRepository(User) private userRepository:Repository<User>
    ){}

    async FindTopicsByUser(id:number):Promise<User>{
        
        const topicsByUser = await this.userRepository.createQueryBuilder("users")
        .select([
            'topics.name',
            'topics.id',
            'users.name',
            'users.id'
        ])
        .innerJoin("users.topics", "topics")
        .where("users.id = :id", {id})
        .getOne()
        
        if(!topicsByUser.topics.length){
            throw new NotFoundException({
                message: "The user has no topics"
            })
        }

        return topicsByUser
    }
}