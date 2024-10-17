import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookAvailabilityEnum } from './../../../books/domain/enums/book-availability.enum';
import { UserBookEntity } from './../../../infrastructure/persistence/typeorm/entities/user-book.entity';
import { CreateUserBookDto } from './../../../users/http-server/dto/create-user-book.dto';
import { UpdateUserBookDto } from './../../../users/http-server/dto/update-user-book.dto';
import { Repository } from 'typeorm';
import { mapUserBookToResponse } from '../utils/user-book-response.mapper';
import { UserEntity } from './../../../infrastructure/persistence/typeorm/entities/user.entity';
import { BookEntity } from './../../../infrastructure/persistence/typeorm/entities/book.entity';

@Injectable()
export class UserBooksService {
  constructor(
    @InjectRepository(UserBookEntity)
    private readonly userBookRepository: Repository<UserBookEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(BookEntity)
    private readonly bookRepository: Repository<BookEntity>,
  ) {}

  async createUserBook(userId: number, createUserBookDto: CreateUserBookDto) {
    const { bookId, condition, comment } = createUserBookDto;
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found.`);
    }

    const book = await this.bookRepository.findOne({
      where: { id: bookId },
    });
    if (!book) {
      throw new NotFoundException(`Book with id ${bookId} not found.`);
    }
    const existingUserBook = await this.userBookRepository.findOne({
      where: {
        user: { id: userId },
        book: { id: bookId },
      },
      relations: ['user', 'book'],
    });

    if (existingUserBook) {
      throw new ConflictException('This user already owns this book.');
    }

    try {
      const newUserBook = await this.userBookRepository.create({
        user,
        book,
        condition,
        available: BookAvailabilityEnum.AVAILABLE,
        comment,
      });

      const savedUserBook = await this.userBookRepository.save(newUserBook);

      return mapUserBookToResponse(savedUserBook);
    } catch (error) {
      throw error;
    }
  }

  async findAllByUserId(userId: number) {
    try {
      const userBooks = await this.userBookRepository.find({
        where: {
          user: { id: userId },
        },
        relations: ['user', 'book'],
      });
      return userBooks.map((userBook) => mapUserBookToResponse(userBook));
    } catch (error) {
      throw error;
    }
  }

  async findOnebyUserandBookId(userId: number, bookId: number) {
    try {
      const userBook = await this.userBookRepository.findOne({
        where: {
          user: { id: userId },
          book: { id: bookId },
        },
        relations: ['user', 'book'],
      });
      if (!userBook) {
        throw new NotFoundException('This user does not have this book.');
      }
      return mapUserBookToResponse(userBook)[0];
    } catch (error) {
      throw error;
    }
  }

  async findOnebyUserBookId(userBookId: string) {
    try {
      const userBook = await this.userBookRepository.findOne({
        where: { id: userBookId },
        relations: ['user', 'book'],
      });
      return mapUserBookToResponse(userBook);
    } catch (error) {
      throw error;
    }
  }

  async updateUserBook(
    userBookId: string,
    updateUserBookDto: UpdateUserBookDto,
  ) {
    const userBook = await this.userBookRepository.findOne({
      where: {
        id: userBookId,
      },
      relations: ['user', 'book'],
    });

    if (!userBook) {
      throw new NotFoundException(`UserBook with id ${userBookId} not found`);
    }

    Object.assign(userBook, updateUserBookDto);

    try {
      const savedUserBook = await this.userBookRepository.save(userBook);
      return mapUserBookToResponse(savedUserBook);
    } catch (error) {
      throw error;
    }
  }

  async removeUserBook(userBookId: string) {
    const userBook = await this.userBookRepository.findOne({
      where: {
        id: userBookId,
      },
      relations: ['user', 'book'],
    });

    if (!userBook) {
      throw new NotFoundException(`UserBook with ID ${userBookId} not found.`);
    }

    try {
      await this.userBookRepository.remove(userBook);
      return {
        message: `UserBook with ID ${userBookId} successfully removed.`,
      };
    } catch (error) {
      throw error;
    }
  }
}
