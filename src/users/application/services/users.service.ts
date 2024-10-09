import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from '../../http-server/dto/update-user.dto';
import { CreateUserCommand } from '../commands/create-user.command';

@Injectable()
export class UsersService {
  create(createUserDto: CreateUserCommand) {
    const { fullName, email, phoneNumber, address } = createUserDto;
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
