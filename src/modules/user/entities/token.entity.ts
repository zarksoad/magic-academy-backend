import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('tokens')
export class Token {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @ManyToOne(() => User, user => user.id)
  @JoinColumn({ name: 'created_by' })
  @Column({ type: 'int', name: 'created_by' })
  createdBy: number;

  @Column({ type: 'text' })
  token: string;

  @Column({ type: 'boolean', name: 'is_used' })
  isUsed: boolean;

  @Column({
    type: 'timestamp',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({ type: 'timestamp', name: '4 updated_at', nullable: true })
  updatedAt: Date;
}
