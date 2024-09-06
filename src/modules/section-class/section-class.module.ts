import { Module } from '@nestjs/common';
import { SectionClassService } from './section-class.service';
import { SectionClassController } from './section-class.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SectionClass } from './entities/section-class.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      SectionClass
    ])
  ],
  controllers: [SectionClassController],
  providers: [SectionClassService],
})
export class SectionClassModule {}
