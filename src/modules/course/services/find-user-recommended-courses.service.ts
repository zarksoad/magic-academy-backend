import { Injectable } from "@nestjs/common";
import { FindUserByIdService } from "../../user/services/find-user-by-id.service";
import { FindUserTopicsService } from "../../user/services/find-user-topics.service";
import { getUserTopicsIdsTransformer } from "../transformers/get-user-topics-ids.transformer";
import { getCoursesByUserIdIdsTransformer } from "../transformers/get-courses-by-userId-ids.transformer";
import { User } from "../../user/entities";
import { Course } from "../entities/course.entity";
import { FindCoursesRelatedToTopicsService } from "./find-courses-related-to-topics.service";
import { FindCoursesByUserIdService } from "../../user/services/find-courses-by-user.service";

@Injectable()
export class FindUserRecommendedCoursesService{
    constructor(
        private findUserByIdService:FindUserByIdService,
        private findUserTopicsService:FindUserTopicsService,
        private findCoursesRelatedToTopicsService:FindCoursesRelatedToTopicsService,
        private findCoursesByUserIdService:FindCoursesByUserIdService
    ){}
    
    async FindUserRecommendedCourses(id:number):Promise<Course[]>{
        const {id:UserId} = await this.findUserByIdService.findUserById(id);

        //Getting topics by user
        const topicsByUser = await this.findUserTopicsService.FindTopicsByUser(UserId);
        
        const userTopicIds = getUserTopicsIdsTransformer(topicsByUser)
        
        //Getting courses related to topics
        const coursesRelatedToTopics = await this.findCoursesRelatedToTopicsService.FindCoursesRelatedToTopics(userTopicIds)
        console.log("coursesRelatedToTopics: ", coursesRelatedToTopics)
        // Getting courses id of courses in which the user is already enrolled in
        const coursesByUserId = await this.findCoursesByUserIdService.findCoursesByUserId(UserId)
        const coursesByUserIdIds = getCoursesByUserIdIdsTransformer(coursesByUserId)
        console.log("coursesByUserIdIds: ", coursesByUserIdIds)
        
        //Courses in which the student is already enrolled in are filtered out
        const recommendedCoursesFiltered = coursesRelatedToTopics.filter(courseRelatedToTopic => {
            return !coursesByUserIdIds.includes(courseRelatedToTopic.id)
        })

        if(!recommendedCoursesFiltered.length){
            // TODO: what to do in cases in which this array length is zero?
        }

        return recommendedCoursesFiltered
    }
}
