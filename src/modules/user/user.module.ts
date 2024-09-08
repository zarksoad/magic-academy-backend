import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role, User } from './entities';
import {
  BcryptPasswordHasher,
  CheckEmailExistService,
  CreateUSer,
  FindRole,
  CreateMailService,
  TokenService,
} from './services';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Topic } from '../topics/entities/topic.entity';
import { Token } from './entities/token.entity';
import { UserCourse } from './entities/user-course.entity';
import { UserSection } from './entities/user-section.entity';
import { UserClass } from './entities/user-classes.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([User, Role, Topic, Token]),
    TypeOrmModule.forFeature([
      User,
      Role,
      Topic,
      UserCourse,
      UserSection,
      UserClass,
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (ConfigService: ConfigService) => ({
        secret: ConfigService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
    }),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    CreateUSer,
    FindRole,
    BcryptPasswordHasher,
    CheckEmailExistService,
    CreateMailService,
    TokenService,
  ],
})
export class UserModule {}
