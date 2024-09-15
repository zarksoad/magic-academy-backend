import { Injectable } from "@nestjs/common";
import { User } from "../../entities";
import { ApiProperty } from "@nestjs/swagger";

@Injectable()
export class GetLatestClassesInProgressByCourseByUserOutputDto{
    @ApiProperty({
        example: [
            {
                "users_id": 2,
                "user_class_status": "IN PROGRESS",
                "user_class_updated_at": "2024-12-19T05:00:00.000Z",
                "section_class_title": "Intro to Web Development",
                "section_class_id": 21,
                "course_section_name": "Introducción",
                "course_name": "Aprende front",
                "course_description": "Esto es una descripción de front"
            },
            {
                "users_id": 2,
                "user_class_status": "IN PROGRESS",
                "user_class_updated_at": "2024-12-30T05:00:00.000Z",
                "section_class_title": "Data Analysis Overview",
                "section_class_id": 29,
                "course_section_name": "Que es el análisis de datos - Sección",
                "course_name": "Aprende analisis de datos",
                "course_description": "Esto es una descripción de analisis"
            }
        ],
        description: 'Returns a set of last seen classes per course per user. "Last seen" means the classes with the last "updated_at" property of the course.'
    })
    data: User;
}