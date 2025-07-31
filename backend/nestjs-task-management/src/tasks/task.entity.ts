import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TaskStatus } from './task-status.enum';
import { User } from 'src/auth/user.entity';
import { Exclude } from 'class-transformer';

// Task Property in database
@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;

  @CreateDateColumn()
  createdAt: Date;

  // user property
  // here mulitple tasks can point to one user
  @ManyToOne((_type) => User, (user) => user.tasks, { eager: false })
  // To exclude the user properties in json
  @Exclude({ toPlainOnly: true })
  user: User;
}
