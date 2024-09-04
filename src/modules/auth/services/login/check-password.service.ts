import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

interface IMatchPassword {
  // eslint-disable-next-line no-unused-vars
  checkingPassword(password: string, hashPassword: string): Promise<boolean>;
}

@Injectable()
export class MatchPassword implements IMatchPassword {
  async checkingPassword(
    password: string,
    hashPassword: string,
  ): Promise<boolean> {
    const validator = await bcrypt.compare(password, hashPassword);
    return validator;
  }
}
