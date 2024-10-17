import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBookDto } from '../../http-server/dto/create-book.dto';
import { UpdateBookDto } from '../../http-server/dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BookEntity } from './../../../infrastructure/persistence/typeorm/entities/book.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(BookEntity)
    private readonly bookRepository: Repository<BookEntity>,
  ) {}
  async create(createBookDto: CreateBookDto) {
    const { title, author } = createBookDto;

    const existingBook = await this.bookRepository.findOne({
      where: { title, author },
    });

    if (existingBook) {
      throw new ConflictException('This book already exists.');
    }

    const book = new BookEntity();
    book.title = title;
    book.author = author;

    try {
      const savedBook = await this.bookRepository.save(book);
      return savedBook;
    } catch (err) {
      throw err;
    }
  }

  async findAll() {
    return this.bookRepository.find({
      order: {
        title: 'ASC',
      },
    });
  }

  async findById(id: number) {
    return this.bookRepository.findOne({ where: { id } });
  }

  async findByTitleAndAuthor(title: string, author: string) {
    const existingBook = await this.bookRepository.findOne({
      where: { title, author },
    });
    if (!existingBook) {
      throw new NotFoundException('Book not found');
    }
    return existingBook;
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    const book = await this.bookRepository.findOne({ where: { id } });
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found.`);
    }

    Object.assign(book, updateBookDto);

    try {
      return await this.bookRepository.save(book);
    } catch (err) {
      throw err;
    }
  }

  async remove(id: number) {
    const book = await this.bookRepository.findOne({ where: { id } });
    if (!book) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }
    await this.bookRepository.remove(book);
    return { message: `Book with ID ${id} successfully removed.` };
  }
}
