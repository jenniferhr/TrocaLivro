import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('books')
export class BookEntity {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

  @Column({
    name: 'title',
    nullable: false,
  })
  title: string;

  @Column({
    name: 'author',
    nullable: false,
  })
  author: string;

  @Column({
    name: 'condition',
    nullable: false,
  })
  condition: string;

  @Column({
    name: 'available',
    nullable: false,
  })
  available: string;

  @Column({
    name: 'comment',
    nullable: true,
  })
  comment?: string;

  @CreateDateColumn({
    name: 'created_at',
    nullable: false,
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    nullable: false,
  })
  updatedAt: Date;
}
