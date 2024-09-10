import { IUserTopics } from "../interfaces/user-topics.interface";

export const getUserTopicsIds = (userTopics:IUserTopics):number[] =>{
    return userTopics.topics.map(userTopic => (
        userTopic.id
    ))
}