import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookAvailabilityEnum } from 'src/books/domain/enums/book-availability.enum';
import { UserBookEntity } from 'src/infrastructure/persistence/typeorm/entities/user-book.entity';
import { CreateUserBookDto } from 'src/users/http-server/dto/create-user-book.dto';
import { UpdateUserBookDto } from 'src/users/http-server/dto/update-user-book.dto';
import { Repository } from 'typeorm';

@Injectable()
export class UserBooksService {
  constructor(
    @InjectRepository(UserBookEntity)
    private readonly userBookRepository: Repository<UserBookEntity>,
  ) {}

  async createUserBook(userId: number, createUserBookDto: CreateUserBookDto) {
    const existingUserBook = await this.findOnebyUserandBookId(
      userId,
      createUserBookDto.bookId,
    );

    if (existingUserBook) {
      throw new Error('Este usuário já possui este livro.');
    }

    const newUserBook = this.userBookRepository.create({
      user: { id: userId },
      book: { id: createUserBookDto.bookId },
      condition: createUserBookDto.condition,
      available: BookAvailabilityEnum.AVAILABLE,
      comment: createUserBookDto.comment,
    });

    try {
      return await this.userBookRepository.save(newUserBook);
    } catch (err) {
      throw err;
    }
  }

  async findAllByUserId(userId: number) {
    return this.userBookRepository.find({
      where: {
        user: { id: userId },
      },
      relations: ['user', 'book'],
    });
  }

  async findOnebyUserandBookId(userId: number, bookId: number) {
    return this.userBookRepository.findOne({
      where: {
        user: { id: userId },
        book: { id: bookId },
      },
      relations: ['user', 'book'],
    });
  }

  async findOnebyUserBookId(userBookId: string) {
    return this.userBookRepository.findOne({
      where: { id: userBookId },
      relations: ['user', 'book'],
    });
  }

  async updateUserBook(
    userBookId: string,
    updateUserBookDto: UpdateUserBookDto,
  ) {
    const userBook = await this.userBookRepository.findOneBy({
      id: userBookId,
    });
    if (!userBook) {
      throw new Error(`UserBook with id ${userBookId} not found`);
    }

    Object.assign(userBook, updateUserBookDto);

    try {
      return this.userBookRepository.save(userBook);
    } catch (err) {
      throw err;
    }
  }

  async removeUserBook(userBookId: string) {
    const userBook = await this.findOnebyUserBookId(userBookId);
    if (!userBook) {
      throw new NotFoundException(`UserBook with ID ${userBookId} not found.`);
    }
    await this.userBookRepository.remove(userBook);
    return { message: `UserBook with ID ${userBookId} successfully removed.` };
  }
}
