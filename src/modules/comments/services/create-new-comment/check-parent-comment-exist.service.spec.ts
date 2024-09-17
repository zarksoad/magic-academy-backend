import { Test, TestingModule } from '@nestjs/testing';
import { CheckParentExistService } from './check-parent-comment-exist.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Comment } from '../../entities/comment.entity';
import { NotFoundException } from '@nestjs/common';

describe('CheckParentExistService', () => {
  let service: CheckParentExistService;
  let commentRepository: Repository<Comment>;

  const mockCommentRepository = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CheckParentExistService,
        {
          provide: getRepositoryToken(Comment),
          useValue: mockCommentRepository,
        },
      ],
    }).compile();

    service = module.get<CheckParentExistService>(CheckParentExistService);
    commentRepository = module.get<Repository<Comment>>(
      getRepositoryToken(Comment),
    );
  });

  afterEach(() => {
    jest.clearAllMocks(); // Limpiar mocks después de cada prueba
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return true if parent comment exists', async () => {
    const parentId = 1;
    const mockComment = { id: parentId };

    mockCommentRepository.findOne.mockResolvedValue(mockComment);

    const result = await service.checkParent(parentId);

    expect(result).toBe(true);
    expect(mockCommentRepository.findOne).toHaveBeenCalledWith({
      where: { id: parentId },
    });
  });

  it('should throw NotFoundException if parent comment does not exist', async () => {
    const parentId = 1;

    mockCommentRepository.findOne.mockResolvedValue(null);

    await expect(service.checkParent(parentId)).rejects.toThrow(
      new NotFoundException("The Parent comment doesn't exist"),
    );

    expect(mockCommentRepository.findOne).toHaveBeenCalledWith({
      where: { id: parentId },
    });
  });
});
