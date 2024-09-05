import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SectionClassService } from './section-class.service';
import { CreateSectionClassDto } from './dto/create-section-class.dto';
import { UpdateSectionClassDto } from './dto/update-section-class.dto';

@Controller('section-class')
export class SectionClassController {
  constructor(private readonly sectionClassService: SectionClassService) {}

  @Post()
  create(@Body() createSectionClassDto: CreateSectionClassDto) {
    return this.sectionClassService.create(createSectionClassDto);
  }

  @Get()
  findAll() {
    return this.sectionClassService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sectionClassService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSectionClassDto: UpdateSectionClassDto) {
    return this.sectionClassService.update(+id, updateSectionClassDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sectionClassService.remove(+id);
  }
}
