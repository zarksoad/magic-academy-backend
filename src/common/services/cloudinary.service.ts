/* eslint-disable no-undef */
import { Injectable } from '@nestjs/common';
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

  /**
   * Uploads an image file to Cloudinary from a buffer.
   * @param file - File object containing the buffer.
   * @returns The result of the upload operation.
   */
  async uploadImage(
    file: Express.Multer.File,
  ): Promise<CloudinaryUploadResponse> {
    console.log('Entering uploadImage');

    if (!file || !file.buffer) {
      console.error('File or file.buffer is undefined or null');
      throw new Error('Invalid file or file buffer');
    }

    try {
      // Convert buffer to a readable stream
      const stream = new Readable();
      stream.push(file.buffer);
      stream.push(null);

      // Upload the buffer to Cloudinary
      return new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ resource_type: 'image' }, (error, result) => {
            if (error) {
              console.error(`Upload error: ${error.message}`);
              reject(error);
            } else {
              console.log(`Upload successful: ${JSON.stringify(result)}`);
              resolve(result as CloudinaryUploadResponse);
            }
          })
          .end(file.buffer); // Pass the buffer directly
      });
    } catch (error) {
      console.error(`Error in uploadImage: ${error.message}`);
      throw error;
    }
  }
  /**
   * Uploads a video file to Cloudinary from a buffer.
   * @param file - File object containing the buffer.
   * @returns The result of the upload operation.
   */
  async uploadVideo(
    file: Express.Multer.File,
  ): Promise<CloudinaryUploadResponse> {
    console.log('Entering uploadVideo');

    if (!file || !file.buffer) {
      console.error('File or file.buffer is undefined or null');
      throw new Error('Invalid file or file buffer');
    }

    try {
      // Convert buffer to a readable stream
      const stream = new Readable();
      stream.push(file.buffer);
      stream.push(null);

      // Upload the buffer to Cloudinary
      return new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ resource_type: 'video' }, (error, result) => {
            if (error) {
              console.error(`Upload error: ${error.message}`);
              reject(error);
            } else {
              console.log(`Upload successful: ${JSON.stringify(result)}`);
              resolve(result as CloudinaryUploadResponse);
            }
          })
          .end(file.buffer); // Pass the buffer directly
      });
    } catch (error) {
      console.error(`Error in uploadVideo: ${error.message}`);
      throw error;
    }
  }

  /**
   * Updates an existing resource (image or video) in Cloudinary.
   * @param publicId - Public ID of the resource to be updated.
   * @param file - File object containing the buffer to replace the existing resource.
   * @param resourceType - Type of the resource ('image' or 'video').
   * @returns The result of the update operation.
   */
  async updateResource(
    publicId: string,
    file: Express.Multer.File,
    resourceType: 'image' | 'video',
  ): Promise<CloudinaryUploadResponse> {
    console.log('Entering updateResource');

    if (!file || !file.buffer) {
      console.error('File or file.buffer is undefined or null');
      throw new Error('Invalid file or file buffer');
    }

    try {
      // Convert buffer to a readable stream
      const stream = new Readable();
      stream.push(file.buffer);
      stream.push(null);

      // Update the resource in Cloudinary
      return new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              public_id: publicId,
              resource_type: resourceType,
              overwrite: true,
            },
            (error, result) => {
              if (error) {
                console.error(`Update error: ${error.message}`);
                reject(error);
              } else {
                console.log(`Update successful: ${JSON.stringify(result)}`);
                resolve(result as CloudinaryUploadResponse);
              }
            },
          )
          .end(file.buffer); // Pass the buffer directly
      });
    } catch (error) {
      console.error(`Error in updateResource: ${error.message}`);
      throw error;
    }
  }

  /**
   * Deletes a resource (image or video) from Cloudinary.
   * @param publicId - Public ID of the resource to be deleted.
   * @param resourceType - Type of the resource ('image' or 'video').
   * @returns The result of the delete operation.
   */
  async deleteResource(
    publicId: string,
    resourceType: 'image' | 'video',
  ): Promise<any> {
    console.log('Entering deleteResource');

    return new Promise((resolve, reject) => {
      cloudinary.uploader.destroy(
        publicId,
        { resource_type: resourceType },
        (error, result) => {
          if (error) {
            console.error(`Delete error: ${error.message}`);
            reject(error);
          } else {
            console.log(`Delete successful: ${JSON.stringify(result)}`);
            resolve(result);
          }
        },
      );
    });
  }
}
