import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BookEntity } from './book.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

  @Column({
    name: 'full_name',
    nullable: false,
  })
  fullName: string;

  @Column({
    name: 'email',
    nullable: false,
  })
  email: string;

  @Column({
    name: 'phone_number',
    nullable: false,
  })
  phoneNumber: string;

  @Column({
    name: 'address',
    nullable: false,
  })
  address: string;

  @ManyToMany(() => BookEntity)
  @JoinTable() // Isso cria a tabela de junção
  books: BookEntity[];
}
