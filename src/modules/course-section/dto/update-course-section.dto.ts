import { PartialType } from '@nestjs/swagger';
import { CreateCourseSectionDto } from './create-course-section.dto';

export class UpdateCourseSectionDto extends PartialType(CreateCourseSectionDto) {}
