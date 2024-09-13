/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { BadRequestException, Injectable } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';

@Injectable()
export class UploadCloudinaryService {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  async upload(file: Express.Multer.File, publicId?: string): Promise<string> {
    try {
      const mimeType = file.mimetype;

      if (publicId) {
        console.log(publicId, 'Dentro de public id para eliminar');
        try {
          const resourceType = mimeType.startsWith('image/')
            ? 'image'
            : 'video';
          await this.cloudinaryService.deleteResource(publicId, resourceType);
          publicId = '';
        } catch (error) {
          // Handle the error from deletion if it occurs, but continue with updating
          console.error(`Error deleting resource: ${error.message}`);
        }

        // Then update the resource
        if (mimeType.startsWith('image/')) {
          const result = await this.cloudinaryService.updateResource(
            publicId,
            file,
            'image',
          );
          return result.secure_url;
        } else if (mimeType.startsWith('video/')) {
          const result = await this.cloudinaryService.updateResource(
            publicId,
            file,
            'video',
          );
          return result.secure_url;
        } else {
          throw new BadRequestException('Invalid file type.');
        }
      } else {
        // If no publicId is provided, upload a new resource
        if (mimeType.startsWith('image/')) {
          const result = await this.cloudinaryService.uploadImage(file);
          return result.secure_url;
        } else if (mimeType.startsWith('video/')) {
          const result = await this.cloudinaryService.uploadVideo(file);
          return result.secure_url;
        } else {
          throw new BadRequestException('Invalid file type.');
        }
      }
    } catch (error) {
      throw new BadRequestException(`File upload error: ${error.message}`);
    }
  }
}
