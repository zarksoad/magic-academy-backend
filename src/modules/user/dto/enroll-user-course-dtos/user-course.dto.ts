import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { UserProgressEnum } from '../../enums/user-sections.enum';

export class UserCourseDto {
  @IsOptional()
  @IsNumber({}, { message: 'User id is a number' })
  userId: number;

  @IsNumber({}, { message: 'Course id is a number' })
  courseId: number;

  @IsEnum(UserProgressEnum, {
    message:
      'Status must be a valid enum value: UNINITIALIZED, IN PROGRESS, COMPLETED',
  })
  status: UserProgressEnum;
}
