import { User } from 'src/users/domain/user';
import { BookConditionEnum } from './enums/book-condition.enum';
import { BookAvailabilityEnum } from './enums/book-availability.enum';

export class Book {
  constructor(
    public id: number,
    public title: string,
    public author: string,
    public user: User,
    public condition: BookConditionEnum,
    public available: BookAvailabilityEnum,
    public comment?: string,
  ) {}
}
