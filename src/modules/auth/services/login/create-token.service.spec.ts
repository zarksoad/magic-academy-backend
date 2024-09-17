import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { GenerateToken } from './create-token.service';

describe('GenerateToken', () => {
  let service: GenerateToken;
  let jwtService: JwtService;

  const mockJwtService = {
    signAsync: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GenerateToken,
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    service = module.get<GenerateToken>(GenerateToken);
    jwtService = module.get<JwtService>(JwtService);
  });

  afterEach(() => {
    jest.clearAllMocks(); // Limpiar los mocks después de cada prueba
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a token', async () => {
    const mockToken = 'mocked_jwt_token';
    mockJwtService.signAsync.mockResolvedValue(mockToken);

    const id = 1;
    const roleId = 2;
    const result = await service.token(id, roleId);

    expect(result).toEqual({
      message: 'This is your token',
      access_token: mockToken,
    });
    expect(mockJwtService.signAsync).toHaveBeenCalledWith({
      userId: id,
      roleId: roleId,
    });
  });
});
