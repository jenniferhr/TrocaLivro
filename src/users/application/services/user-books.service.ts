import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookAvailabilityEnum } from 'src/books/domain/enums/book-availability.enum';
import { UserBookEntity } from 'src/infrastructure/persistence/typeorm/entities/user-book.entity';
import { CreateUserBookDto } from 'src/users/http-server/dto/create-user-book.dto';
import { UpdateUserBookDto } from 'src/users/http-server/dto/update-user-book.dto';
import { Repository } from 'typeorm';
import { mapUserBookToResponse } from '../utils/user-book-response.mapper';
import { UserEntity } from 'src/infrastructure/persistence/typeorm/entities/user.entity';
import { BookEntity } from 'src/infrastructure/persistence/typeorm/entities/book.entity';
import { FindUserBooksByCriteriaDto } from 'src/users/http-server/dto/find-user-books-by-criteria.dto';

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

  async findByCriteria(findByCriteriaDto: FindUserBooksByCriteriaDto) {
    const { userId, bookId, title, author, condition, available } =
      findByCriteriaDto;

    let query = this.userBookRepository
      .createQueryBuilder('userBook')
      .leftJoinAndSelect('userBook.user', 'user')
      .leftJoinAndSelect('userBook.book', 'book');

    if (userId) {
      query = query.andWhere('user.id = :userId', { userId });
    }
    if (bookId) {
      query = query.andWhere('book.id = :bookId', { bookId });
    }
    if (title) {
      query = query.andWhere('book.title LIKE :title', { title: `%${title}%` });
    }
    if (author) {
      query = query.andWhere('book.author LIKE :author', {
        author: `%${author}%`,
      });
    }
    if (condition) {
      query = query.andWhere('userBook.condition = :condition', { condition });
    }
    if (available) {
      query = query.andWhere('userBook.available = :available', { available });
    }

    return await query.getMany();
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
