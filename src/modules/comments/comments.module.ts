import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { CreateCommentService } from './services/create-new-comment/create-comment.service';
import { CheckCommentType } from './services/create-new-comment/check-if-comment-type-exist.service';
import { CourseSection } from '../course-section/entities/course-section.entity';
import { Course } from '../course/entities/course.entity';
import { SectionClass } from '../section-class/entities/section-class.entity';
import { CheckParentExistService } from './services/create-new-comment/check-parent-comment-exist.service';
import { GetCommentsServices } from './services/get-comments/get-comment.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment, CourseSection, Course, SectionClass]),
  ],
  controllers: [CommentsController],
  providers: [
    CommentsService,
    CreateCommentService,
    CheckCommentType,
    CheckParentExistService,
    GetCommentsServices,
  ],
})
export class CommentsModule {}
