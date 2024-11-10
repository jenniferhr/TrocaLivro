import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UpdateUserDto } from '../../http-server/dto/update-user.dto';
import { CreateUserCommand } from '../commands/create-user.command';
import { UserEntity } from 'src/infrastructure/persistence/typeorm/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  saltOrRounds: number = 10;

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(createUserCommand: CreateUserCommand) {
    const { fullName, email, phoneNumber, address, password } =
      createUserCommand;

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

    const hashedPassword = await bcrypt.hash(password, this.saltOrRounds);

    user.password = hashedPassword;

    try {
      const savedUser = await this.userRepository.save(user);
      delete savedUser.password;

      return savedUser;
    } catch (err) {
      throw new InternalServerErrorException('Error saving new user');
    }
  }

  async findAll() {
    return await this.userRepository.find({
      order: {
        id: 'ASC',
      },
    });
  }

  async findById(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }
    return user;
  }

  async findFullUserByEmail(email: string) {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.email = :email', { email })
      .getOne();

    if (!user) {
      throw new NotFoundException(`User with email ${email} not found.`);
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
