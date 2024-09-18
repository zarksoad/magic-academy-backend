import { Injectable } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { UserProgressEnum } from "../../enums/user-sections.enum";

@Injectable()
export class GetLatestClassesInProgressByCourseByUserResponseDto {
    @ApiProperty({ example: "IN PROGRESS", description: "State of completion of the class" })
    user_class_status: UserProgressEnum;

    @ApiProperty({ example: "Intro to Web Development" })
    section_class_title: string;

    @ApiProperty({ example: 21 })
    section_class_id: number;

    @ApiProperty({ example: "Introducción" })
    course_section_name: string;

    @ApiProperty({ example: 21 })
    course_id: number;

    @ApiProperty({ example: "Aprende front" })
    course_name: string;

    @ApiProperty({ example: 8, description: "Number of classes in the course" })
    numClassesInCourse?: number;

    @ApiProperty({ example: 8, description: "Number of class in the corresponding course" })
    numClassInCourse?: number;
}

export class anotherDTO{
    data: GetLatestClassesInProgressByCourseByUserResponseDto[]
}