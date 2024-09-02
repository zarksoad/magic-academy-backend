import { Module } from '@nestjs/common';
import { DatabaseModule } from './modules/database.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [DatabaseModule, UserModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
