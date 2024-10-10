import { Column, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column('json', { name: 'books', nullable: true })
  books: Array<object>;
}
