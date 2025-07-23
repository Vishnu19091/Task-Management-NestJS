import { Task } from 'src/tasks/task.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

// here we Define properties of table in DB
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  // one user can have many tasks
  // One to Many
  @OneToMany((type) => Task, (task) => task.user, { eager: true })
  tasks: Task[];
}
