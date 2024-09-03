import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;

  beforeEach(async () => {
    userService = {
      create: jest.fn().mockResolvedValue('mocked user'),
    } as unknown as UserService;

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: userService,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call create method on UserService', async () => {
    const createUserDto: CreateUserDto = {
      name: 'test user',
      email: 'test@example.com',
      password: 'password',
      avatarUrl: 'http://example.com/avatar.jpg', // Opcional
    };

    await controller.create(createUserDto);

    expect(userService.create).toHaveBeenCalledWith(createUserDto);
  });
});
