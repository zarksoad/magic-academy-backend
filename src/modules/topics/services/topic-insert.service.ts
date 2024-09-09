import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';

@Injectable()
export class InserTopicService {
  constructor(private readonly entityManager: EntityManager) {}

  async insertTopic(): Promise<void> {
    await this.entityManager.query(`
      INSERT INTO topics (name) VALUES 
      ('css'),
      ('java')
    `);
  }
}
