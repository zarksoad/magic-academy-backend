import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUSer, FindRole } from './services';
import { User } from './entities';

@Injectable()
export class UserService {
  constructor(private readonly createUser: CreateUSer) {}

  async create(createUserDto: CreateUserDto, token?: string): Promise<User> {
    return await this.createUser.saveUser(createUserDto, token);
  }
}
