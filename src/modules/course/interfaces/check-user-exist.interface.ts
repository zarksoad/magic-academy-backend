/* eslint-disable no-unused-vars */
import { User } from '../../user/entities';

export interface ICheckUserExist {
  checkUser(userId: number): Promise<User[]>;
}
