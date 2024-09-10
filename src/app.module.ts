import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; // Import ConfigModule
import { DatabaseModule } from './modules/database.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { TopicsModule } from './modules/topics/topics.module';
import { CommentsModule } from './modules/comments/comments.module';
import { JwtStrategy } from './modules/auth/strategies/jwt.strategy';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { AppInitializer } from './app.initializer';

@Module({
  imports: [
    ConfigModule.forRoot({
      // Initialize ConfigModule globally
      isGlobal: true, // Makes ConfigModule available throughout the application
    }),
    CacheModule.register({
      ttl: 5, // live time
      max: 10, //max element saved in cache
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
