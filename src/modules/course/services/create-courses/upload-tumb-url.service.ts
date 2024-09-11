/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CloudinaryService } from '../../../../common/services/cloudinary.service';

@Injectable()
export class UploadThumbnailUrlService {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  async uploadThumbnail(file: Express.Multer.File): Promise<string> {
    console.log(file, 'este es el path');
    console.log(file.path, 'este es el path');
    try {
      const mimeType = file.mimetype;
      console.log(mimeType);

      if (mimeType.startsWith('image/')) {
        const result = await this.cloudinaryService.uploadImage(file);
        console.log(result);

        return result.secure_url;
      } else if (mimeType.startsWith('video/')) {
        const result = await this.cloudinaryService.uploadVideo(file);
        return result.secure_url;
      } else {
        throw new Error('Invalid file type.');
      }
    } catch (error) {
      throw new Error(`File upload error: ${error.message}`);
    }
  }
}
