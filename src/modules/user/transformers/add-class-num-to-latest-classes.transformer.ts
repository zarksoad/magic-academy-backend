import { GetLatestClassesInProgressByCourseByUserResponseDto, GetLatestClassesInProgressByCourseByUserWithClassNumResponseDto } from "../dto/dto-output/get-latest-classes-inprogress-byCourse-byUser-output.dto";

export const addClassNumToLatestClassesTransformer = (latestClasses: GetLatestClassesInProgressByCourseByUserResponseDto[]): GetLatestClassesInProgressByCourseByUserWithClassNumResponseDto[] => {
    return latestClasses.map(latestClass => ({
        ...latestClass,
        numClassesInCourse: -1,
        numClassInCourse: -1
    }))
}