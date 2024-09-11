/* eslint-disable no-unused-vars */
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DataSource, QueryRunner } from 'typeorm';

@Injectable()
export class TransactionalService {
  constructor(private readonly dataSource: DataSource) {} // Inject DataSource to manage database connections

  // Generic method to execute any operation within a transaction
  async executeInTransaction<T>(
    callback: (queryRunner: QueryRunner) => Promise<T>, // A callback function that receives a QueryRunner and returns a promise
  ): Promise<T> {
    const queryRunner = this.dataSource.createQueryRunner(); // Create a new query runner to handle the transaction
    await queryRunner.connect(); // Establish a connection to the database
    await queryRunner.startTransaction(); // Begin the transaction

    try {
      // Execute the callback function, passing the query runner to it
      const result = await callback(queryRunner);

      // If the callback succeeds, commit the transaction
      await queryRunner.commitTransaction();
      return result; // Return the result from the callback
    } catch (error) {
      // If an error occurs, roll back the transaction to maintain data consistency
      await queryRunner.rollbackTransaction();
      // Throw a more descriptive error message
      throw new InternalServerErrorException(
        'An error occurred while processing the transaction. The transaction has been rolled back.',
      );
    } finally {
      await queryRunner.release(); // Release the query runner, regardless of the outcome
    }
  }
}
