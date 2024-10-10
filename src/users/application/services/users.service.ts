import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from '../../http-server/dto/update-user.dto';
import { CreateUserCommand } from '../commands/create-user.command';
import { User } from 'src/users/domain/user';
import { UserEntity } from 'src/users/infrastructure/persistence/typeorm/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(createUserCommand: CreateUserCommand) {
    const { fullName, email, phoneNumber, address } = createUserCommand;
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });

    if (existingUser) {
      throw new Error('User with this email already exists.');
    }

    const user = new User(fullName, email, phoneNumber, address);

    const savedUser = await this.userRepository.save(user);

    return savedUser;
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
