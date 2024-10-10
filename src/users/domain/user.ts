export class User {
  public id: number;
  public books: Array<object>;

  constructor(
    public fullName: string,
    public email: string,
    public phoneNumber: string,
    public address: string,
    books: Array<object> = [],
  ) {
    this.books = books;
  }
}
