/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import {
  Controller,
  Post,
  Body,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { SectionClassService } from './section-class.service';
import { CreateSectionClassDto } from './dto/create-section-class.dto';
import { ApiPostOperation } from '../../common/decorators/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
@ApiTags('Class')
@Controller('section-class')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SectionClassController {
  constructor(private readonly sectionClassService: SectionClassService) {}

  @Post()
  @Roles(2)
  @ApiPostOperation(
    'Create Class',
    CreateSectionClassDto,
    CreateSectionClassDto,
    true,
  )
  @UseInterceptors(FileInterceptor('video'))
  create(
    @Body() createSectionClassDto: CreateSectionClassDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.sectionClassService.create(createSectionClassDto, file);
  }
}
