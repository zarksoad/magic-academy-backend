import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SectionClass } from '../../entities/section-class.entity';
import { Repository } from 'typeorm';
import { CheckCourseEnrollment } from './check-user-enrollment.service';
import { CheckInstructorProvided } from './check-instructor-provided.service';

@Injectable()
export class GetClassByIdService {
  constructor(
    @InjectRepository(SectionClass)
    private readonly sectionClassRepository: Repository<SectionClass>,
    private readonly checkCourseEnrollment: CheckCourseEnrollment,
    private readonly checkInstructorProvided: CheckInstructorProvided,
  ) {}

  async getClass(
    id: number,
    userId: number,
    userRole: number,
  ): Promise<SectionClass> {
    if (userRole === 2) {
      await this.checkInstructorProvided.checkUserCourseRelation(userId, id);
    } else {
      await this.checkCourseEnrollment.getEnrollment(userId);
    }
    const classSection = await this.sectionClassRepository.findOne({
      where: { id: id },
    });
    if (!classSection) {
      throw new NotFoundException('class not found');
    }
    return classSection;
  }
}
