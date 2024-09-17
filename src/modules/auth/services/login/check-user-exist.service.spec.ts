import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { CheckUserExistService } from './check-user-exist.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './../../../user/entities/user.entity';

describe('CheckUserExistService', () => {
  let service: CheckUserExistService;
  let userRepository: Repository<User>;

  const mockUserRepository = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CheckUserExistService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<CheckUserExistService>(CheckUserExistService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  afterEach(() => {
    jest.clearAllMocks(); // Limpiar los mocks después de cada prueba
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return user if it exists', async () => {
    const mockUser = { id: 1, email: 'test@example.com' } as User;
    mockUserRepository.findOne.mockResolvedValue(mockUser);

    const result = await service.checkUser('test@example.com');
    expect(result).toEqual(mockUser);
    expect(mockUserRepository.findOne).toHaveBeenCalledWith({
      where: { email: 'test@example.com' },
    });
  });

  it('should throw NotFoundException if user does not exist', async () => {
    mockUserRepository.findOne.mockResolvedValue(null);

    await expect(service.checkUser('notfound@example.com')).rejects.toThrow(
      NotFoundException,
    );
    expect(mockUserRepository.findOne).toHaveBeenCalledWith({
      where: { email: 'notfound@example.com' },
    });
  });
});
