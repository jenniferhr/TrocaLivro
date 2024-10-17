import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookEntity } from './../../../infrastructure/persistence/typeorm/entities/book.entity';

describe('BooksService', () => {
  let service: BooksService;
  let repository: jest.Mocked<Repository<BookEntity>>;

  beforeEach(async () => {
    const mockRepository =
      jest.createMockFromModule<Repository<BookEntity>>('@nestjs/typeorm');

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: getRepositoryToken(BookEntity),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
    repository = module.get<Repository<BookEntity>>(
      getRepositoryToken(BookEntity),
    ) as jest.Mocked<Repository<BookEntity>>;

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });
});
