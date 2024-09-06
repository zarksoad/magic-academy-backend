import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Course } from '../../course/entities/course.entity';

@Entity('topics')
export class Topic {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar', length: 20, unique: true })
  name: string;

  @ManyToMany(() => User, user => user.topics)
  users: User[];

  @ManyToMany(() => Course, course => course.topics)
  courses: Course[];
}
