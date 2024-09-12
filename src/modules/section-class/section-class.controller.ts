import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { SectionClassService } from './section-class.service';
import { CreateSectionClassDto } from './dto/create-section-class.dto';
import { ApiPostOperation } from '../../common/decorators/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Class')
@Controller('section-class')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SectionClassController {
  constructor(private readonly sectionClassService: SectionClassService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(2)
  @ApiPostOperation(
    'Create Class',
    CreateSectionClassDto,
    CreateSectionClassDto,
    true,
  )
  async create(@Body() createSectionClassDto: CreateSectionClassDto) {
    return await this.sectionClassService.create(createSectionClassDto);
  }

  @Get()
  async findAllClassSection(@Body('section') section: number) {
    return await this.sectionClassService.findClassSection(section);
  }
}
