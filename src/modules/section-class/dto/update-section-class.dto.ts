import { PartialType } from '@nestjs/swagger';
import { CreateSectionClassDto } from './create-section-class.dto';

export class UpdateSectionClassDto extends PartialType(CreateSectionClassDto) {}
