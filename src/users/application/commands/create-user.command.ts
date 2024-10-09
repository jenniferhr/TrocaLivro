export class CreateUserCommand {
  constructor(
    public readonly fullName: string,
    public readonly email: string,
    public readonly phoneNumber: string,
    public readonly address: string,
  ) {}
}
