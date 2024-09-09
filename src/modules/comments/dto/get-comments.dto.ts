import { ApiProperty } from '@nestjs/swagger';

class CommentChildrenDto {
  @ApiProperty({
    description: 'Unique identifier for the comment',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'ID of the parent comment. Null if this is a root comment.',
    example: null,
    nullable: true,
  })
  comments_id: number | null;

  @ApiProperty({
    description: 'Title of the comment',
    example: 'Erick va a invitar a pizza',
  })
  title: string;

  @ApiProperty({
    description: 'Content of the comment',
    example: 'Para que christian pague',
  })
  content: string;

  @ApiProperty({
    description: 'Type of the comment, such as "COURSE"',
    example: 'COURSE',
  })
  comment_type: string;

  @ApiProperty({
    description: 'ID related to the comment type',
    example: 2,
  })
  comment_types_id: number;

  @ApiProperty({
    description: 'Timestamp of when the comment was created',
    example: '2024-09-06T20:10:14.570Z',
  })
  created_at: string;

  @ApiProperty({
    description: 'ID of the user who created the comment',
    example: 1,
  })
  users_id: number;

  @ApiProperty({
    description: 'Nested comments (replies) to this comment',
    type: () => [CommentChildrenDto], // Self-referencing for nested children
    example: [],
  })
  children: CommentChildrenDto[];
}

export class GetCommentsResponseDto {
  @ApiProperty({
    description: 'HTTP status code of the response',
    example: 200,
  })
  code: number;

  @ApiProperty({
    description: 'Message providing more details about the response',
    example: 'Success',
  })
  message: string;

  @ApiProperty({
    description: 'Array of comments data',
    type: () => [CommentChildrenDto],
    example: [
      {
        id: 1,
        comments_id: null,
        title: 'Course Feedback',
        content:
          'The course is highly informative and valuable for developers.',
        comment_type: 'COURSE',
        comment_types_id: 2,
        created_at: '2024-09-06T20:10:14.570Z',
        users_id: 1,
        children: [
          {
            id: 2,
            comments_id: 1,
            title: 'Reply to main comment',
            content: 'This is a reply',
            comment_type: 'COURSE',
            comment_types_id: 2,
            created_at: '2024-09-07T10:00:00.000Z',
            users_id: 2,
            children: [],
          },
        ],
      },
    ],
  })
  data: CommentChildrenDto[];
}
