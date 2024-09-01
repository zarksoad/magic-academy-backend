import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LoginService } from './services/login/login.service.service';
import { MatchPassword } from './services/login/check-password.service';
import { CheckUserExistService } from './services/login/check-user-exist.service';
import { GenerateToken } from './services/login/create-token.service';
import { User } from '../user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ConfigModule.forRoot(), // Make sure to initialize ConfigModule
    JwtModule.registerAsync({
      imports: [ConfigModule], // Import ConfigModule here
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LoginService,
    MatchPassword,
    CheckUserExistService,
    GenerateToken,
    JwtStrategy,
  ],
  exports: [JwtStrategy],
})
export class AuthModule {}
