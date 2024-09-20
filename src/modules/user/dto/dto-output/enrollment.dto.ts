import { ApiProperty } from "@nestjs/swagger"
import { createApiResponseDto } from "../../../../common/helpers/create-api-response-dto.helper"

export class UserEnrollmentDataDto {
    @ApiProperty({ example: 'Enrollment successful: ' })
    message: string
}

export const UserEnrollmentResponseDto = createApiResponseDto({
    classDataDto: UserEnrollmentDataDto,
    isArray: true
})