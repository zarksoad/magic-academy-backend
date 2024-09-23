import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

@Injectable()
export class InserUserService {
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  async insertAdminUser(): Promise<void> {
    const existingUser = await this.entityManager.query(`
      SELECT email FROM users WHERE email IN('admin@magic.com')
      `);
    if (existingUser.length > 0) {
      console.log('Admin already exists, skipping insertion.');
      return;
    }

    await this.entityManager.query(`
      INSERT INTO users (name, email, password, avatar_url, roleId, created_at, updated_at) VALUES ('admin', 'admin@magic.com', '$2b$10$9WhVLkjuXSLrfly.0PLKD.TIipxSRQ4vIrJWS66WN3uC9ZyyFp7fO', 'N/A', 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
      `);
  }
  async insertInstructorUser(): Promise<void> {
    const existingUser = await this.entityManager.query(`
      SELECT email FROM users WHERE email IN('instructor@magic.com')
      `);
    if (existingUser.length > 0) {
      console.log('Instructor already exists, skipping insertion.');
      return;
    }

    await this.entityManager.query(`
      INSERT INTO users (name, email, password, avatar_url, roleId, created_at, updated_at) VALUES ('instructor', 'instructor@magic.com', '$2b$10$9WhVLkjuXSLrfly.0PLKD.TIipxSRQ4vIrJWS66WN3uC9ZyyFp7fO', 'N/A', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
      `);
  }
}
