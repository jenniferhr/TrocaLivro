import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateUserDto } from '../../http-server/dto/update-user.dto';
import { CreateUserCommand } from '../commands/create-user.command';
import { UserEntity } from 'src/infrastructure/persistence/typeorm/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserMapper } from 'src/infrastructure/persistence/typeorm/mappers/user.mapper';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly userMapper: UserMapper,
  ) {}

  async create(createUserCommand: CreateUserCommand) {
    const { fullName, email, phoneNumber, address } = createUserCommand;

    const existingUser = await this.userRepository.findOne({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('User with this email already exists.');
    }

    const user = new UserEntity();
    user.fullName = fullName;
    user.email = email;
    user.phoneNumber = phoneNumber;
    user.address = address;
    user.books = [];

    try {
      const savedUser = await this.userRepository.save(user);
      return savedUser;
    } catch (err) {
      throw err;
    }
  }

  async findAll() {
    return this.userRepository.find({
      order: {
        id: 'ASC',
      },
    });
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }

    Object.assign(user, updateUserDto);

    try {
      return await this.userRepository.save(user);
    } catch (err) {
      throw err;
    }
  }

  async remove(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }
    await this.userRepository.remove(user);
    return { message: `User with ID ${id} successfully removed.` };
  }
}
