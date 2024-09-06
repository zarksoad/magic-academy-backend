import { Module } from '@nestjs/common';
import { SectionClassService } from './section-class.service';
import { SectionClassController } from './section-class.controller';

@Module({
  controllers: [SectionClassController],
  providers: [SectionClassService],
})
export class SectionClassModule {}
