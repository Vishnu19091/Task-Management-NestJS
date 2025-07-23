import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// here we Define properties of table in DB
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;
}
