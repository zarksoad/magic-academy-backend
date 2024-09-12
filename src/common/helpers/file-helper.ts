import { promises as fs } from 'fs';
import * as mime from 'mime-types';
import { BadRequestException } from '@nestjs/common';

export class FileHelper {
  /**
   * Validates if the file at the given path is a valid file and has an allowed MIME type.
   * @param filePath - Path to the file to be validated.
   * @returns True if the file is valid; otherwise, throws a BadRequestException.
   */
  static async validateFile(filePath: string): Promise<boolean> {
    try {
      const stats = await fs.stat(filePath);
      const mimeType = mime.lookup(filePath);

      if (!stats.isFile()) {
        throw new BadRequestException(
          'The path does not point to a valid file.',
        );
      }

      const allowedMimeTypes = ['image/jpeg', 'image/png', 'video/mp4']; // Allowed MIME types
      if (!allowedMimeTypes.includes(mimeType || '')) {
        throw new BadRequestException('File type not allowed.');
      }

      return true;
    } catch (error) {
      // Throw a BadRequestException if validation fails
      throw new BadRequestException(`File validation error: ${error.message}`);
    }
  }

  /**
   * Processes the file at the given path.
   * For now, it just returns the same file path.
   * @param filePath - Path to the file to be processed.
   * @returns The path to the processed file.
   */
  static async processFile(filePath: string): Promise<string> {
    // Process file as needed (e.g., resize, compress) and return the processed file path
    return filePath; // For now, just return the same path
  }
}
