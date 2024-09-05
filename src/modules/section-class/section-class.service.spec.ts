import { Test, TestingModule } from '@nestjs/testing';
import { SectionClassService } from './section-class.service';

describe('SectionClassService', () => {
  let service: SectionClassService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SectionClassService],
    }).compile();

    service = module.get<SectionClassService>(SectionClassService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
