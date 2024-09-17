import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';
import { MatchPassword } from './check-password.service';

describe('MatchPassword', () => {
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

  it('should return true when passwords match', async () => {
    const password = 'testPassword';
    const hashPassword = await bcrypt.hash(password, 10);

    const result = await service.checkingPassword(password, hashPassword);
    expect(result).toBe(true);
  });

  it('should return false when passwords do not match', async () => {
    const password = 'testPassword';
    const wrongPassword = 'wrongPassword';
    const hashPassword = await bcrypt.hash(password, 10);

    const result = await service.checkingPassword(wrongPassword, hashPassword);
    expect(result).toBe(false);
  });
});
