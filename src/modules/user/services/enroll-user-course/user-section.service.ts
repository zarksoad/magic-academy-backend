import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserSection } from '../../entities/user-section.entity';
import { Repository } from 'typeorm';
import { UserSectionDto } from '../../dto/enroll-user-course-dtos/user-section.dto';
import { FindUserByIdService } from '../find-user-by-id.service';
import { FindAllSectionService } from '../../../course-section/services/find-all-section.service';

@Injectable()
export class UserSectionService {
  constructor(
    @InjectRepository(UserSection)
    private readonly userSectionRepository: Repository<UserSection>,
    private readonly findUserByIdService: FindUserByIdService,
    private readonly findAllSecionService: FindAllSectionService,
  ) {}
  async insertUserSection(userSectionDto: UserSectionDto, courseId: number) {
    const user = userSectionDto.userId;

    const userExists = await this.findUserByIdService.findUserById(
      userSectionDto.userId,
    );
    if (!userExists) {
      throw new NotFoundException({
        status: 400,
        message: 'The user does not exist',
      });
    }

    const sections = await this.findAllSecionService.getAll(courseId);
    if (!sections || sections.length === 0) {
      throw new NotFoundException('No sections found for the given course');
    }

    const validSectionIds = sections.map(section => section.id);

    const invalidSectionIds = userSectionDto.sectionId.filter(
      id => !validSectionIds.includes(id),
    );
    if (invalidSectionIds.length > 0) {
      throw new NotFoundException(
        `Sections with IDs ${invalidSectionIds.join(', ')} not found for the given course`,
      );
    }

    const userSections = userSectionDto.sectionId.map(sectionId => ({
      user: { id: userSectionDto.userId },
      courseSection: { id: sectionId },
      status: userSectionDto.status,
    }));

    await this.userSectionRepository.save(userSections);

    return sections;
  }
}
