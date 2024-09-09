import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

@Injectable()
export class RoleService {
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  async insertRoles(): Promise<void> {
    await this.entityManager.query(`
      INSERT INTO roles (id, name) VALUES
      (1, 'estudiante'),
      (2, 'instructor'),
      (3, 'admin')
    `);
  }
}
