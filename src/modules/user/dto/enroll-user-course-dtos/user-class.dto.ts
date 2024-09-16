import { IsEnum, IsNumber, IsArray } from 'class-validator';
import { UserProgressEnum } from '../../enums/user-sections.enum';

export class UserClassDto {
  @IsNumber({}, { message: 'User id is a number' })
  userId: number;

  @IsArray({ message: 'Section must be an array of numbers' })
  sectionClassId: number[];

  @IsEnum(UserProgressEnum, {
    message:
      'Status must be a valid enum value: UNINITIALIZED, IN PROGRESS, COMPLETED',
  })
  status: UserProgressEnum;
}
