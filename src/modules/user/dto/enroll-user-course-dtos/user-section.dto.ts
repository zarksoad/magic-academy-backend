import { IsArray, IsEnum, IsNumber } from 'class-validator';
import { UserProgressEnum } from '../../enums/user-sections.enum';

export class UserSectionDto {
  @IsNumber({}, { message: 'User must be a number' })
  userId: number;

  @IsArray({ message: 'Section must be a array of numbers' })
  sectionId: number[];

  @IsEnum(UserProgressEnum, {
    message:
      'Status must be a valid enum value: UNINITIALIZED, IN PROGRESS, COMPLETED',
  })
  status: UserProgressEnum;
}
