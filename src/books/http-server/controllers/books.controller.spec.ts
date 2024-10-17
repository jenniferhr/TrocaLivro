import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './books.controller';
import { BooksService } from '../../application/services/books.service';
import { Repository } from 'typeorm';
import { BookEntity } from './../../../infrastructure/persistence/typeorm/entities/book.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('BooksController', () => {
  let controller: BooksController;
  let repository: Repository<BookEntity>;

  beforeEach(async () => {
    const mockRepository =
      jest.createMockFromModule<Repository<BookEntity>>('@nestjs/typeorm');

    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [
        BooksService,
        {
          provide: getRepositoryToken(BookEntity),
          useValue: mockRepository,
        },
      ],
    }).compile();

    controller = module.get<BooksController>(BooksController);
    repository = module.get<Repository<BookEntity>>(
      getRepositoryToken(BookEntity),
    ) as jest.Mocked<Repository<BookEntity>>;

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(repository).toBeDefined();
  });
});
