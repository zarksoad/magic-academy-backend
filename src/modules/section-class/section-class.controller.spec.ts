import { Test, TestingModule } from '@nestjs/testing';
import { SectionClassController } from './section-class.controller';
import { SectionClassService } from './section-class.service';

describe('SectionClassController', () => {
  let controller: SectionClassController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SectionClassController],
      providers: [SectionClassService],
    }).compile();

    controller = module.get<SectionClassController>(SectionClassController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
