import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SectionClass } from '../../entities/section-class.entity';
import { Repository } from 'typeorm';
import { CheckCourseEnrollment } from './check-user-enrollment.service';
import { CheckInstructorProvided } from './check-instructor-provided.service';
import { GetCourseIdBySection } from './get-section-id-by-class.service';

export interface ClassWithCourseId {
  sectionClass: SectionClass;
  courseId: number;
}

@Injectable()
export class GetClassByIdService {
  constructor(
    @InjectRepository(SectionClass)
    private readonly sectionClassRepository: Repository<SectionClass>,
    private readonly checkCourseEnrollment: CheckCourseEnrollment,
    private readonly checkInstructorProvided: CheckInstructorProvided,
    private readonly getCourseIdBySection: GetCourseIdBySection,
  ) {}

  async getClass(
    id: number,
    userId: number,
    userRole: number,
  ): Promise<ClassWithCourseId> {
    console.log(id,"este es el did");
    const sectionClass = await this.sectionClassRepository
      .createQueryBuilder('sectionClass')
      .leftJoinAndSelect('sectionClass.courseSection', 'courseSection')
      .where('sectionClass.id = :id', { id: id })
      .getOne();
    if (!sectionClass) {
      throw new NotFoundException('class not found');
    }
    const sectionId = sectionClass.courseSection;
    const courseId = await this.getCourseIdBySection.getCourse(sectionId.id);
    if (userRole === 2) {
      await this.checkInstructorProvided.checkUserCourseRelation(
        userId,
        courseId,
      );
    } else {
      await this.checkCourseEnrollment.getEnrollment(userId);
    }
    return { sectionClass, courseId };
  }
}
