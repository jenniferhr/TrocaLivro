import { User } from '../../../users/domain/user';

export abstract class UserRepository {
  abstract save(user: User): Promise<User>;
  // abstract findByEmail(email: string): Promise<User | null>;
}
