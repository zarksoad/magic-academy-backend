/* eslint-disable no-unused-vars */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { BcryptPasswordHasher } from './hash-password.service';
import { FindRole } from './find-role.service';
import { CheckEmailExistService } from './check-user-exist-register.service';

@Injectable()
export class CreateUSer {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly cryptPassword: BcryptPasswordHasher,
    private readonly findRole: FindRole,
    private readonly verifyEmail: CheckEmailExistService,
  ) {}
  async saveUser(userData: CreateUserDto, token?: string): Promise<User> {
    const password = userData.password;
    userData.password = await this.cryptPassword.hash(password, 10);
    let roleId = 1; // Default roleId for student
    await this.verifyEmail.checkUser(userData.email);

    if (token) {
      try {
        const role = await this.findRole.getRoleFromToken(token);
        roleId = role.id;
      } catch (error) {
        throw new Error('Invalid token or role not found');
      }
    }

    const user = this.userRepository.create({
      ...userData,
      roleId: roleId,
    });
    return await this.userRepository.save(user);
  }
}
