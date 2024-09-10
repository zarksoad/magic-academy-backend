import { ITopics } from "./topics.interface";

export interface IUserTopics{
    id: number,
    name: string,
    topics: ITopics[]
}