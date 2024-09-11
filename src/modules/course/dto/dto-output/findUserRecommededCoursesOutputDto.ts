import { Injectable } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { Course } from "../../entities/course.entity";

@Injectable()
export class FindUserRecommendedCoursesOutputDto{
    @ApiProperty({
        example:[{
                    "id": 1,
                    "name": "Aprende css desde cero",
                    "topics": [
                        {
                            "id": 1,
                            "name": "css"
                        }
                    ]
                },
                {
                    "id": 2,
                    "name": "Aprende frontend",
                    "topics": [
                        {
                            "id": 1,
                            "name": "css"
                        },
                        {
                            "id": 2,
                            "name": "javascript"
                        },
                        {
                            "id": 3,
                            "name": "html"
                        }
                    ]
                },
            ]
        ,
        description: "Returns a set of recommended courses per user according to their topics"
    })
    data: Course
}