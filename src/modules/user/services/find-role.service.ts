import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../entities';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class FindRole {
  constructor(
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
    private readonly jwtService: JwtService,
  ) {}

  async getRoleFromToken(token: string): Promise<Role> {
    const decodedToken = this.jwtService.verify(token);

    const roleId = decodedToken.roleId;
    if (!roleId) {
      throw new UnauthorizedException('No role ID found in token');
    }

    const role = await this.roleRepository.findOne({ where: { id: roleId } });
    if (!role) {
      throw new Error('Role not found');
    }

    return role;
  }
  catch(error) {
    throw new UnauthorizedException('Invalid token');
  }
}
