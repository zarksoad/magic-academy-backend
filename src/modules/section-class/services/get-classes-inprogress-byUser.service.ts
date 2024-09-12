import { InjectRepository } from "@nestjs/typeorm";
import { SectionClass } from "../entities/section-class.entity";
import { Repository } from "typeorm";
import { FindUserByIdService } from "../../user/services/find-user-by-id.service";

export class getLatestClassesInProgressByUserByCourseService{

    constructor(
        @InjectRepository(SectionClass) private sectionClassRepository: Repository<SectionClass>,
        private findUserByIdService:FindUserByIdService
    ){}

    async getLatestClassesInProgressByUserByCourse(id:number):Promise<any>
    // Promise<SectionClass>{
    {
        const {id:UserId} = await this.findUserByIdService.findUserById(id);
        return
    }
}