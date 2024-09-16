import { Injectable, NotFoundException } from '@nestjs/common';
import { UserCourseService } from './user-course.service';
import { UserSectionService } from './user-section.service';
import { UserClassService } from './user-class.service';
import { UserCourseDto } from '../../dto/enroll-user-course-dtos/user-course.dto';
import { UserSectionDto } from '../../dto/enroll-user-course-dtos/user-section.dto';
import { FindAllSectionService } from '../../../course-section/services/find-all-section.service';
import { FindAllClassService } from '../../../section-class/services/find-all-class.service';
import { UserClassDto } from '../../dto/enroll-user-course-dtos/user-class.dto';
import { UserProgressEnum } from '../../enums/user-sections.enum';

@Injectable()
export class EnrollService {
  constructor(
    private readonly userCourseService: UserCourseService,
    private readonly userSectionService: UserSectionService,
    private readonly userClassService: UserClassService,
    private readonly findAllSectionService: FindAllSectionService,
    private readonly findAllClassService: FindAllClassService,
  ) {}

  async enroll(userCourseDto: UserCourseDto) {
    // Insert UserCourse
    await this.userCourseService.insertUserCourse(userCourseDto);

    // Get Sections for the course
    const sections = await this.findAllSectionService.getAll(
      userCourseDto.courseId,
    );

    if (!sections || sections.length === 0) {
      throw new NotFoundException('No sections found for the given course');
    }

    // Prepare and insert UserSection
    const userSectionDto: UserSectionDto = {
      userId: userCourseDto.userId,
      sectionId: sections.map(section => section.id),
      status: UserProgressEnum.UNINITIALIZED,
    };

    await this.userSectionService.insertUserSection(
      userSectionDto,
      userCourseDto.courseId,
    );

    let personalizedMessage = [];
    // Process each section to get classes and enroll them
    for (const section of sections) {
      const classes = await this.findAllClassService.getAll(section.id);

      if (classes && classes.length > 0) {
        const userClassDtos: UserClassDto[] = classes.map(sectionClass => ({
          userId: userCourseDto.userId,
          sectionClassId: [sectionClass.id], // Adjusted according to the new DTO
          status: UserProgressEnum.UNINITIALIZED,
        }));

        personalizedMessage = await Promise.all(
          userClassDtos.map(dto => this.userClassService.insertUserClass(dto)),
        );
      }
    }

    return {
      message: 'Enrollment successful' + JSON.stringify(personalizedMessage),
    };
  }
}
