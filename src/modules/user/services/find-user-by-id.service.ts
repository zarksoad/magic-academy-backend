import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entities";
import { Repository } from "typeorm";

@Injectable()
export class FindUserByIdService{
    constructor(
        @InjectRepository(User) private userRepository:Repository<User>
    ){}

    async findUserById(id:number){
        const userData = await this.userRepository.findOne({
            where:{id:+id}
        })

        if(!userData.id){
            throw new NotFoundException({
                status: 400,
                message: "The user does not exist"
            })
        }

        return userData
    }
}