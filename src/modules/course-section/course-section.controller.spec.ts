import { Test, TestingModule } from '@nestjs/testing';
import { CourseSectionController } from './course-section.controller';
import { CourseSectionService } from './course-section.service';

describe('CourseSectionController', () => {
  let controller: CourseSectionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CourseSectionController],
      providers: [CourseSectionService],
    }).compile();

    controller = module.get<CourseSectionController>(CourseSectionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
