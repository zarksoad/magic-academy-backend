import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

@Injectable()
export class InserUserService {
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  async insertUser(): Promise<void> {
    await this.entityManager.query(`
      INSERT INTO users (name, email, password, avatar_url, roleId, created_at, updated_at) VALUES ('admin', 'admin@magic.com', 'Magic1234*', 'N/A', 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
      `);
  }
}
