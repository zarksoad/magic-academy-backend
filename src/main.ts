import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger as logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strips out properties not specified in the DTO
      forbidNonWhitelisted: true, // Throws an error if any unspecified properties are present
      transform: true, // Automatically transforms input data to the expected types
    }),
  );
  await app.listen(process.env.PORT || 3400);
  logger.log(`App running on port ${process.env.PORT}`);
}
bootstrap();
