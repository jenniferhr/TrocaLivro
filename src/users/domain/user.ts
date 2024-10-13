export class User {
  public id: number;

  constructor(
    public fullName: string,
    public email: string,
    public phoneNumber: string,
    public address: string,
  ) {}
}
