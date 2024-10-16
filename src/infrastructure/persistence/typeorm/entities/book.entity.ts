import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('books')
export class BookEntity {
  @ApiProperty({
    description: 'Unique identifier for the book.',
    type: 'bigint',
    example: 1,
  })
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

  @ApiProperty({
    description: 'Title of the book.',
    example: 'The Book of Philosophy',
    required: true,
  })
  @Column({
    name: 'title',
    nullable: false,
  })
  title: string;

  @ApiProperty({
    description: 'Author of the book.',
    example: 'Maria Smith',
    required: true,
  })
  @Column({
    name: 'author',
    nullable: false,
  })
  author: string;

  @ApiProperty({
    description: 'The date and time when the book was created.',
    type: 'string',
    format: 'date-time',
  })
  @CreateDateColumn({
    name: 'created_at',
    nullable: false,
  })
  createdAt: Date;

  @ApiProperty({
    description: 'The date and time when the book was last updated.',
    type: 'string',
    format: 'date-time',
  })
  @UpdateDateColumn({
    name: 'updated_at',
    nullable: false,
  })
  updatedAt: Date;
}
