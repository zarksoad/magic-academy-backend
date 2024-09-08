/* eslint-disable no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CommentTypeEnum } from '../../enums/comment-type/comment-type.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Course } from '../../../course/entities/course.entity';
import { CourseSection } from '../../../course-section/entities/course-section.entity';
import { SectionClass } from '../../../section-class/entities/section-class.entity';

export interface IcheckCommentExist {
  checking(
    commentType_id: number,
    commentType: CommentTypeEnum,
  ): Promise<boolean>;
}

@Injectable()
export class CheckCommentType implements IcheckCommentExist {
  constructor(
    private readonly dataSource: DataSource, // Inject DataSource for QueryBuilder
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    @InjectRepository(CourseSection)
    private readonly courseSectionRepository: Repository<CourseSection>,
    @InjectRepository(SectionClass)
    private readonly sectionClassRepository: Repository<SectionClass>,
  ) {}

  async checking(
    commentType_id: number,
    commentType: CommentTypeEnum,
  ): Promise<boolean> {
    // Determine the entity and alias dynamically
    let entityName: string;
    let alias: string;

    switch (commentType) {
      case CommentTypeEnum.COURSE:
        entityName = Course.name; // Use entity name dynamically
        alias = 'course';
        break;
      case CommentTypeEnum.SECTION:
        entityName = CourseSection.name;
        alias = 'course_sections';
        break;
      case CommentTypeEnum.CLASS:
        entityName = SectionClass.name;
        alias = 'section_class';
        break;
      default:
        throw new Error('Unknown comment type');
    }

    // Use QueryBuilder to check existence dynamically
    const result = await this.dataSource
      .getRepository(entityName) // Dynamically select repository
      .createQueryBuilder(alias)
      .where(`${alias}.id = :id`, { id: commentType_id })
      .getOne();

    return result !== null;
  }
}
