export class CourseDto {
  id: number;
  name: string;
  description: string;
  thumbnail_url: string | null;
  slug: string;
  published_at: Date;
  instructor_name: string;
}
