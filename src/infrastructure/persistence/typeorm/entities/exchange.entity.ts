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
import { ExchangeStatusEnum } from 'src/exchanges/domain/enums/exchange-status.enum';

@Entity('exchanges')
export class ExchangeEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserBookEntity, { nullable: false })
  @JoinColumn({ name: 'offered_user_book_id' })
  offeredUserBook: UserBookEntity;

  @ManyToOne(() => UserBookEntity, { nullable: false })
  @JoinColumn({ name: 'requested_user_book_id' })
  requestedUserBook: UserBookEntity;

  @Column({
    name: 'status',
    type: 'enum',
    nullable: false,
    enum: ExchangeStatusEnum,
  })
  status: ExchangeStatusEnum;

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
