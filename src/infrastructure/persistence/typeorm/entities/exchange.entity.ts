import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserBookEntity } from './user-book.entity';
import { ExchangeStatusEnum } from './../../../../exchanges/domain/enums/exchange-status.enum';
import { ApiProperty } from '@nestjs/swagger';

@Entity('exchanges')
export class ExchangeEntity {
  @ApiProperty({
    description: 'Unique identifier for the exchange request.',
    type: 'string',
    format: 'uuid',
    example: '8e997661-52b1-42aa-9439-a75fd4175dd5',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'The user book being offered in the exchange.',
    type: () => UserBookEntity,
  })
  @ManyToOne(() => UserBookEntity, { nullable: false })
  @JoinColumn({ name: 'offered_user_book_id' })
  offeredUserBook: UserBookEntity;

  @ApiProperty({
    description: 'The user book being requested in the exchange.',
    type: () => UserBookEntity,
  })
  @ManyToOne(() => UserBookEntity, { nullable: false })
  @JoinColumn({ name: 'requested_user_book_id' })
  requestedUserBook: UserBookEntity;

  @ApiProperty({
    description: 'Current status of the exchange request.',
    enum: ExchangeStatusEnum,
    enumName: 'ExchangeStatusEnum',
    example: ExchangeStatusEnum.ACCEPTED,
  })
  @Column({
    name: 'status',
    type: 'enum',
    nullable: false,
    enum: ExchangeStatusEnum,
  })
  status: ExchangeStatusEnum;

  @ApiProperty({
    description: 'Timestamp when the exchange request was created.',
    type: 'string',
    format: 'date-time',
  })
  @CreateDateColumn({
    name: 'created_at',
    nullable: false,
  })
  public createdAt: Date;

  @ApiProperty({
    description: 'Timestamp when the exchange request was last updated.',
    type: 'string',
    format: 'date-time',
  })
  @UpdateDateColumn({
    name: 'updated_at',
    nullable: false,
  })
  public updatedAt: Date;
}
