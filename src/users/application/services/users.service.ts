import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from '../../http-server/dto/update-user.dto';
import { CreateUserCommand } from '../commands/create-user.command';

@Injectable()
export class UsersService {
  async create(createUserDto: CreateUserCommand) {
    const { fullName, email, phoneNumber, address } = createUserDto;
    return 'This action adds a new user';
  }

  async findAll() {
    return `This action returns all users`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
