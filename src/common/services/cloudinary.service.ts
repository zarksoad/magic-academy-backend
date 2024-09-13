/* eslint-disable no-undef */
import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryUploadResponse } from '../interfaces/cloudinary.interface';
import { Readable } from 'stream';

@Injectable()
export class CloudinaryService {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  private async uploadToCloudinary(
    resourceType: 'image' | 'video',
    file: Express.Multer.File,
    publicId?: string,
  ): Promise<CloudinaryUploadResponse> {
    if (!file || !file.buffer) {
      throw new BadRequestException('Invalid file or file buffer');
    }

    // Convert buffer to a readable stream
    const stream = new Readable();
    stream.push(file.buffer);
    stream.push(null);

    try {
      const uploadResult = await new Promise<CloudinaryUploadResponse>(
        (resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              {
                resource_type: resourceType,
                public_id: publicId,
                overwrite: !!publicId,
              },
              (error, result) => {
                if (error) {
                  reject(error);
                } else {
                  resolve(result as CloudinaryUploadResponse);
                }
              },
            )
            .end(file.buffer);
        },
      );
      return uploadResult;
    } catch (error) {
      throw new InternalServerErrorException(
        `Error in uploadToCloudinary: ${error.message}`,
      );
    }
  }

  async uploadImage(
    file: Express.Multer.File,
  ): Promise<CloudinaryUploadResponse> {
    return this.uploadToCloudinary('image', file);
  }

  async uploadVideo(
    file: Express.Multer.File,
  ): Promise<CloudinaryUploadResponse> {
    return this.uploadToCloudinary('video', file);
  }

  async updateResource(
    publicId: string,
    file: Express.Multer.File,
    resourceType: 'image' | 'video',
  ): Promise<CloudinaryUploadResponse> {
    return this.uploadToCloudinary(resourceType, file, publicId);
  }

  async deleteResource(
    publicId: string,
    resourceType: 'image' | 'video',
  ): Promise<any> {
    try {
      const deleteResult = await new Promise<any>((resolve, reject) => {
        cloudinary.uploader.destroy(
          publicId,
          { resource_type: resourceType },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          },
        );
      });
      return deleteResult;
    } catch (error) {
      throw new InternalServerErrorException(
        `Error in deleteResource: ${error.message}`,
      );
    }
  }
}
