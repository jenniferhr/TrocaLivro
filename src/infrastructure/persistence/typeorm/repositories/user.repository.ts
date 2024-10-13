import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../../../users/application/ports/user.repository';
import { UserMapper } from '../mappers/user.mapper';
import { User } from 'src/users/domain/user';

@Injectable()
export class TypeOrmUserRepository implements UserRepository {
  constructor(private readonly userMapper: UserMapper) {}

  async save(user: User): Promise<User> {
    const entity = this.userMapper.toPersistence(user);
    // const savedEntity = await this.repository.save(entity);
    return this.userMapper.toDomain(entity);
  }

  // async findByEmail(email: string): Promise<User | null> {
  //   // const userEntity = await this.repository.findOne({ where: { email } });
  //   // if (!userEntity) return null;
  //   return this.userMapper.toDomain(userEntity);
  // }
}
