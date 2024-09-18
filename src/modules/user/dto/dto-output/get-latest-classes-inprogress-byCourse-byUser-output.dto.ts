import { Injectable } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { UserProgressEnum } from "../../enums/user-sections.enum";

@Injectable()
export class GetLatestClassesInProgressByCourseByUserResponseDto {
    @ApiProperty({ example: "IN PROGRESS", description: "State of completion of the class" })
    userClassStatus: UserProgressEnum;

    @ApiProperty({ example: "Intro to Web Development" })
    sectionClassTitle: string;

    @ApiProperty({ example: 21 })
    sectionClassId: number;

    @ApiProperty({ example: "Introducción" })
    courseSectionName: string;

    @ApiProperty({ example: 21 })
    courseId: number;

    @ApiProperty({ example: "Aprende front" })
    courseName: string;
}

@Injectable()
export class GetLatestClassesInProgressByCourseByUserWithClassNumResponseDto extends GetLatestClassesInProgressByCourseByUserResponseDto {
    @ApiProperty({ example: 8, description: "Number of classes in the course" })
    numClassesInCourse: number;

    @ApiProperty({ example: 8, description: "Number of class in the corresponding course" })
    numClassInCourse: number;
}