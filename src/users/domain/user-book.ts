import { BookAvailabilityEnum } from './../../books/domain/enums/book-availability.enum';
import { BookConditionEnum } from './../../books/domain/enums/book-condition.enum';
import { User } from './user';
import { Book } from './../../books/domain/book';

export class UserBook {
  constructor(
    public id: string,
    public user: User,
    public book: Book,
    public condition: BookConditionEnum,
    public available: BookAvailabilityEnum,
    public comment?: string,
  ) {}
}
