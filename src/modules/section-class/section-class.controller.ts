import {
  Controller,
  Post,
  Body,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Patch,
  Param,
  Get,
} from '@nestjs/common';
import { SectionClassService } from './section-class.service';
import { CreateSectionClassDto } from './dto/create-section-class.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiPostOperation } from '../../common/decorators/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { ApiTags } from '@nestjs/swagger';
import { UpdateSectionClassDto } from './dto/update-section-class.dto';
import { UserId } from '../../common/decorators/user/user-Id.decorator';
import { UserRole } from '../../common/decorators/user/userRole.decorator';
@ApiTags('Class')
@Controller('section-class')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SectionClassController {
  constructor(private readonly sectionClassService: SectionClassService) {}

  @Post()
  @Roles(1, 2)
  @ApiPostOperation('Create Class', CreateSectionClassDto, true)
  @UseInterceptors(FileInterceptor('video'))
  create(
    @Body() createSectionClassDto: CreateSectionClassDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.sectionClassService.create(createSectionClassDto, file);
  }

  @Patch(':id')
  @Roles(2)
  @UseInterceptors(FileInterceptor('video'))
  update(
    @Param('id') id: number,
    @Body() updateSectionClassDto: UpdateSectionClassDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.sectionClassService.update(id, updateSectionClassDto, file);
  }

  @Get(':id')
  async findClassById(
    @Param() id: number,
    @UserId() userId: number,
    @UserRole() userRole: number,
  ) {
    return await this.sectionClassService.findClassById(id, userId, userRole);
  }
}
