import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; // Import ConfigModule
import { DatabaseModule } from './modules/database.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { TopicsModule } from './modules/topics/topics.module';
import { CommentsModule } from './modules/comments/comments.module';
import { JwtStrategy } from './modules/auth/strategies/jwt.strategy';
import { APP_INTERCEPTOR } from '@nestjs/core';
import {
  CacheInterceptor,
  CacheModule,
  CacheStore,
} from '@nestjs/cache-manager';
import { AppInitializer } from './app.initializer';
import * as redisStore from 'cache-manager-redis-store';
@Module({
  imports: [
    ConfigModule.forRoot({
      // Initialize ConfigModule globally
      isGlobal: true, // Makes ConfigModule available throughout the application
    }),
    CacheModule.register({
      store: redisStore as unknown as CacheStore,
      host: process.env.REDIS_HOST || 'localhost',
      port: +process.env.REDIS_PORT || 6379,
      auth_pass: process.env.REDIS_PASSWORD,
      ttl: +process.env.REDIS_TTL || 600,
      max: +process.env.REDIS_MAX_ITEMS || 100,
    }),
    DatabaseModule,
    UserModule,
    AuthModule,
    TopicsModule,
    CommentsModule,
  ],
  controllers: [],
  providers: [
    JwtStrategy,
    { provide: APP_INTERCEPTOR, useClass: CacheInterceptor },
    AppInitializer,
  ],
})
export class AppModule {}
