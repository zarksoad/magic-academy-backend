import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserClass } from '../../entities/user-classes.entity';
import { Repository } from 'typeorm';
import { UserClassDto } from '../../dto/enroll-user-course-dtos/user-class.dto';
import { FindUserByIdService } from '../find-user-by-id.service';
import { FindAllClassService } from '../../../section-class/services/find-all-class.service';
import { UserProgressEnum } from '../../enums/user-sections.enum';
import { SectionClass } from '../../../section-class/entities/section-class.entity';
import { measureMemory } from 'vm';

@Injectable()
export class UserClassService {
  constructor(
    @InjectRepository(UserClass)
    private readonly userClassRepository: Repository<UserClass>,
    private readonly findUserByIdService: FindUserByIdService,
    private readonly findAllClassService: FindAllClassService,
  ) {}

  async insertUserClass(userClassDto: UserClassDto): Promise<any> {
    const userExists = await this.findUserByIdService.findUserById(
      userClassDto.userId,
    );
    if (!userExists) {
      throw new NotFoundException('The user does not exist');
    }

    console.log('Section Class IDs:', userClassDto.sectionClassId);

    for (const id of userClassDto.sectionClassId) {
      console.log(`Processing ID: ${id}`);

      let sectionClasses: SectionClass[] = [];

      sectionClasses = await this.findAllClassService.getAll(id);

      let message = '';
      if (!sectionClasses.length) {
        message += ' No class found for section ' + id + '. \n';
      } else {
        for (let i = 0; i < sectionClasses.length; i++) {
          const userClass = new UserClass();
          userClass.user = userExists;
          userClass.sectionClasses = sectionClasses[i];
          userClass.status =
            userClassDto.status || UserProgressEnum.UNINITIALIZED;
          userClass.updated_at = new Date();

          await this.userClassRepository.save(userClass);
        }
      }

      return { message };
    }
  }
}
