import { Injectable } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';
import { User } from 'src/users/domain/user';

@Injectable()
export class UserMapper {
  toDomain(userEntity: UserEntity): User {
    const user = new User(
      userEntity.fullName,
      userEntity.email,
      userEntity.phoneNumber,
      userEntity.address,
      userEntity.books || [],
    );

    user.id = userEntity.id;
    return user;
  }

  toPersistence(user: User): UserEntity {
    const entity = new UserEntity();
    entity.fullName = user.fullName;
    entity.email = user.email;
    entity.phoneNumber = user.phoneNumber;
    entity.address = user.address;
    entity.books = user.books;

    return entity;
  }
}
