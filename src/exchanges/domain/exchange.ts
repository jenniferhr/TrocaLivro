import { UserBook } from 'src/users/domain/user-book';

export class Exchange {
  constructor(
    public id: string,
    public offeredUserBook: UserBook,
    public requestedUserBook: UserBook,
    public status: string,
  ) {}
}
