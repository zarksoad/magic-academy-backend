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
import { CheckTokenStatus } from './services/email/check-token-status.service';
import { UpdateTokenStatus } from './services/email/update-token-status.service';
import { RoleService } from './services/role-insert.service';
import { InserUserService } from './services/user-insert.service';
import { FindCoursesByUserIdService } from './services/find-courses-by-user.service';
import { FindUserByIdService } from './services/find-user-by-id.service';
import { FindUserTopicsService } from './services/find-user-topics.service';
import { TopicExist } from '../topics/services/verify-exist-topic.service';
import { GetByIdUser } from './services/get-user.service';
import { GetLatestClassesInProgressByCourseByUserService } from './services/get-latest-classes-inprogress-byCourse-byUser.service';
import { FindCourseExist } from '../course/services/update-courses/find-course-exist.service';
import { Course } from '../course/entities/course.entity';
import { CourseSection } from '../course-section/entities/course-section.entity';
import { FindAllSectionService } from '../course-section/services/find-all-section.service';
import { UserSectionService } from './services/enroll-user-course/user-section.service';
import { EnrollService } from './services/enroll-user-course/enroll.service';
import { UserCourseService } from './services/enroll-user-course/user-course.service';
import { FindAllClassService } from '../section-class/services/find-all-class.service';
import { UserClassService } from './services/enroll-user-course/user-class.service';
import { SectionClass } from '../section-class/entities/section-class.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([
      User,
      Role,
      Topic,
      Token,
      UserCourse,
      UserSection,
      UserClass,
      Course,
      CourseSection,
      SectionClass,
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
    RoleService,
    CreateUSer,
    FindRole,
    BcryptPasswordHasher,
    CheckEmailExistService,
    CreateMailService,
    TokenService,
    CheckTokenStatus,
    UpdateTokenStatus,
    InserUserService,
    FindUserByIdService,
    FindUserTopicsService,
    TopicExist,
    GetByIdUser,
    FindCoursesByUserIdService,
    GetLatestClassesInProgressByCourseByUserService,
    FindCourseExist,
    FindAllSectionService,
    UserSectionService,
    UserCourseService,
    EnrollService,
    FindAllClassService,
    UserClassService,
  ],
  exports: [
    UserService,
    CreateUSer,
    FindRole,
    BcryptPasswordHasher,
    CheckEmailExistService,
    FindUserByIdService,
    FindUserTopicsService,
    RoleService,
    InserUserService,
    FindCoursesByUserIdService,
    GetLatestClassesInProgressByCourseByUserService,
  ],
})
export class UserModule {}
