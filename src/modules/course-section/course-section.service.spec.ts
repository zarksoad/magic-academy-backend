import { Test, TestingModule } from '@nestjs/testing';
import { CourseSectionService } from './course-section.service';

describe('CourseSectionService', () => {
  let service: CourseSectionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CourseSectionService],
    }).compile();

    service = module.get<CourseSectionService>(CourseSectionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
