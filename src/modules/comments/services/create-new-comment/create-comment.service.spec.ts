import { Test, TestingModule } from '@nestjs/testing';
import { CreateCommentService } from './create-comment.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Comment } from '../../entities/comment.entity';
import { CheckCommentType } from './check-if-comment-type-exist.service';
import { CheckParentExistService } from './check-parent-comment-exist.service';
import { NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from '../../dto/create-comment.dto';
import { CommentTypeEnum } from '../../enums/comment-type/comment-type.enum';

describe('CreateCommentService', () => {
  let service: CreateCommentService;
  let commentRepository: Repository<Comment>;
  let checkCommentType: CheckCommentType;
  let checkParentExistService: CheckParentExistService;

  const mockCommentRepository = {
    create: jest.fn(),
    save: jest.fn(),
  };

  const mockCheckCommentType = {
    checking: jest.fn(),
  };

  const mockCheckParentExistService = {
    checkParent: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateCommentService,
        {
          provide: getRepositoryToken(Comment),
          useValue: mockCommentRepository,
        },
        {
          provide: CheckCommentType,
          useValue: mockCheckCommentType,
        },
        {
          provide: CheckParentExistService,
          useValue: mockCheckParentExistService,
        },
      ],
    }).compile();

    service = module.get<CreateCommentService>(CreateCommentService);
    commentRepository = module.get<Repository<Comment>>(
      getRepositoryToken(Comment),
    );
    checkCommentType = module.get<CheckCommentType>(CheckCommentType);
    checkParentExistService = module.get<CheckParentExistService>(
      CheckParentExistService,
    );
  });

  afterEach(() => {
    jest.clearAllMocks(); // Limpiar mocks después de cada prueba
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new comment if commentType exists and no parent comment is provided', async () => {
    const createCommentDto: CreateCommentDto = {
      comment_types_id: 1,
      comment_type: CommentTypeEnum.COURSE,
      content: 'Test comment',
      comments_id: null,
      title: 'Test Title',
      users_id: 1,
    };

    mockCheckCommentType.checking.mockResolvedValue(true);
    mockCommentRepository.create.mockReturnValue(createCommentDto);
    mockCommentRepository.save.mockResolvedValue(createCommentDto);

    const result = await service.createComment(createCommentDto);

    expect(mockCheckCommentType.checking).toHaveBeenCalledWith(
      1,
      CommentTypeEnum.COURSE,
    );
    expect(mockCommentRepository.create).toHaveBeenCalledWith(createCommentDto);
    expect(mockCommentRepository.save).toHaveBeenCalledWith(createCommentDto);
    expect(result).toEqual(createCommentDto);
  });

  it('should check for parent comment if comments_id is provided', async () => {
    const createCommentDto: CreateCommentDto = {
      comment_types_id: 1,
      comment_type: CommentTypeEnum.SECTION,
      content: 'Test comment',
      comments_id: 2,
      title: 'Test Title 1',
      users_id: 1,
    };

    mockCheckCommentType.checking.mockResolvedValue(true);
    mockCheckParentExistService.checkParent.mockResolvedValue(true);
    mockCommentRepository.create.mockReturnValue(createCommentDto);
    mockCommentRepository.save.mockResolvedValue(createCommentDto);

    const result = await service.createComment(createCommentDto);

    expect(mockCheckCommentType.checking).toHaveBeenCalledWith(
      1,
      CommentTypeEnum.SECTION,
    );
    expect(mockCheckParentExistService.checkParent).toHaveBeenCalledWith(2);
    expect(mockCommentRepository.create).toHaveBeenCalledWith(createCommentDto);
    expect(mockCommentRepository.save).toHaveBeenCalledWith(createCommentDto);
    expect(result).toEqual(createCommentDto);
  });

  it('should throw NotFoundException if commentType does not exist', async () => {
    const createCommentDto: CreateCommentDto = {
      comment_types_id: 1,
      comment_type: CommentTypeEnum.CLASS,
      content: 'Test comment',
      comments_id: null,
      title: 'Test Title 2',
      users_id: 2,
    };

    mockCheckCommentType.checking.mockResolvedValue(false);

    await expect(service.createComment(createCommentDto)).rejects.toThrow(
      NotFoundException,
    );

    expect(mockCheckCommentType.checking).toHaveBeenCalledWith(
      1,
      CommentTypeEnum.CLASS,
    );
    expect(mockCommentRepository.create).not.toHaveBeenCalled();
    expect(mockCommentRepository.save).not.toHaveBeenCalled();
  });

  it('should call checkParent if comments_id is not null', async () => {
    const createCommentDto: CreateCommentDto = {
      comment_types_id: 1,
      comment_type: CommentTypeEnum.SECTION,
      content: 'Test comment',
      comments_id: 10,
      title: 'Test Title 3 ',
      users_id: 3,
    };

    mockCheckCommentType.checking.mockResolvedValue(true);
    mockCheckParentExistService.checkParent.mockResolvedValue(true);
    mockCommentRepository.create.mockReturnValue(createCommentDto);
    mockCommentRepository.save.mockResolvedValue(createCommentDto);

    const result = await service.createComment(createCommentDto);

    expect(mockCheckParentExistService.checkParent).toHaveBeenCalledWith(10);
    expect(result).toEqual(createCommentDto);
  });
});
