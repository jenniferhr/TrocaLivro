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
import { BookConditionEnum } from 'src/books/domain/enums/book-condition.enum';
import { BookAvailabilityEnum } from 'src/books/domain/enums/book-availability.enum';

@Entity('user_books')
export class UserBookEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserEntity, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => BookEntity, { nullable: false })
  @JoinColumn({ name: 'book_id' })
  book: BookEntity;

  @Column({
    name: 'condition',
    type: 'enum',
    nullable: false,
    enum: BookConditionEnum,
  })
  condition: BookConditionEnum;

  @Column({
    name: 'available',
    type: 'enum',
    nullable: false,
    enum: BookAvailabilityEnum,
  })
  available: BookAvailabilityEnum;

  @Column({
    name: 'comment',
    nullable: true,
  })
  comment?: string;

  @CreateDateColumn({
    name: 'created_at',
    nullable: false,
  })
  public createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    nullable: false,
  })
  public updatedAt: Date;
}
