import { Module } from '@nestjs/common';
import { DatabaseModule } from './modules/database.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { TopicsModule } from './modules/topics/topics.module';
import { CommentsModule } from './modules/comments/comments.module';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    AuthModule,
    TopicsModule,
    CommentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
