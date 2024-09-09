import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';

@Injectable()
export class InserTopicService {
  constructor(private readonly entityManager: EntityManager) {}

  async insertTopic(): Promise<void> {
    const existingTopics = await this.entityManager.query(`
      SELECT name FROM topics WHERE name IN ('css', 'java')
    `);

    if (existingTopics.length > 0) {
      console.log('Topics already exist, skipping insertion.:', existingTopics);
      return;
    }

    await this.entityManager.query(`
      INSERT INTO topics (name) VALUES 
      ('css'),
      ('java')
    `);
    console.log('Temas insertados exitosamente.');
  }
}
