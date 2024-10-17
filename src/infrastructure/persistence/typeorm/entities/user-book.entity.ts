import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { BookEntity } from './book.entity';
import { BookConditionEnum } from './../../../../books/domain/enums/book-condition.enum';
import { BookAvailabilityEnum } from './../../../../books/domain/enums/book-availability.enum';

@Entity('user_books')
export class UserBookEntity {
  @ApiProperty({
    description: 'Unique identifier for the user-book association',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'User associated with the book',
  })
  @ManyToOne(() => UserEntity, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ApiProperty({
    description: 'Book associated with the user',
  })
  @ManyToOne(() => BookEntity, { nullable: false })
  @JoinColumn({ name: 'book_id' })
  book: BookEntity;

  @ApiProperty({
    description: 'Condition of the book',
    enum: BookConditionEnum,
    example: BookConditionEnum.NEW,
  })
  @Column({
    name: 'condition',
    type: 'enum',
    nullable: false,
    enum: BookConditionEnum,
  })
  condition: BookConditionEnum;

  @ApiProperty({
    description: 'Availability status of the book',
    enum: BookAvailabilityEnum,
    example: BookAvailabilityEnum.AVAILABLE,
  })
  @Column({
    name: 'available',
    type: 'enum',
    nullable: false,
    enum: BookAvailabilityEnum,
  })
  available: BookAvailabilityEnum;

  @ApiPropertyOptional({
    description: 'Optional comment about the book',
    example: 'The book is in excellent condition.',
    required: false,
  })
  @Column({
    name: 'comment',
    nullable: true,
  })
  comment?: string;

  @ApiProperty({
    description: 'Date when the user-book association was created',
  })
  @CreateDateColumn({
    name: 'created_at',
    nullable: false,
  })
  public createdAt: Date;

  @ApiProperty({
    description: 'Date when the user-book association was last updated',
  })
  @UpdateDateColumn({
    name: 'updated_at',
    nullable: false,
  })
  public updatedAt: Date;
}
