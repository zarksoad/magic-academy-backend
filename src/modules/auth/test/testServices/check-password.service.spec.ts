import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';
import { MatchPassword } from '../../services/login';

describe('MatchPassword Service', () => {
  let service: MatchPassword;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MatchPassword],
    }).compile();

    service = module.get<MatchPassword>(MatchPassword);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return true if passwords match', async () => {
    const password = 'password123';
    const hashPassword = await bcrypt.hash(password, 10);

    jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(true as never);

    const result = await service.checkingPassword(password, hashPassword);
    expect(result).toBe(true);
  });

  it('should return false if passwords do not match', async () => {
    const password = 'password123';
    const hashPassword = await bcrypt.hash('differentPassword', 10);
    jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(false as never);

    const result = await service.checkingPassword(password, hashPassword);
    expect(result).toBe(false);
  });
});
