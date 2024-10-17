import { Test, TestingModule } from '@nestjs/testing';
import { UserBooksService } from './user-books.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BookEntity } from './../../../infrastructure/persistence/typeorm/entities/book.entity';
import { UserBookEntity } from './../../../infrastructure/persistence/typeorm/entities/user-book.entity';
import { UserEntity } from './../../../infrastructure/persistence/typeorm/entities/user.entity';
import { Repository } from 'typeorm';

describe('UserBooksService', () => {
  let service: UserBooksService;
  let userRepository: Repository<UserEntity>;
  let userBookRepository: Repository<UserBookEntity>;
  let bookRepository: Repository<BookEntity>;

  beforeEach(async () => {
    const mockUserRepository =
      jest.createMockFromModule<Repository<UserEntity>>('@nestjs/typeorm');
    const mockUserBookRepository =
      jest.createMockFromModule<Repository<UserBookEntity>>('@nestjs/typeorm');
    const mockBookRepository =
      jest.createMockFromModule<Repository<BookEntity>>('@nestjs/typeorm');

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserBooksService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: mockUserRepository,
        },
        {
          provide: getRepositoryToken(UserBookEntity),
          useValue: mockUserBookRepository,
        },
        {
          provide: getRepositoryToken(BookEntity),
          useValue: mockBookRepository,
        },
      ],
    }).compile();

    service = module.get<UserBooksService>(UserBooksService);
    userRepository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    ) as jest.Mocked<Repository<UserEntity>>;
    userBookRepository = module.get<Repository<UserBookEntity>>(
      getRepositoryToken(UserBookEntity),
    ) as jest.Mocked<Repository<UserBookEntity>>;
    bookRepository = module.get<Repository<BookEntity>>(
      getRepositoryToken(BookEntity),
    ) as jest.Mocked<Repository<BookEntity>>;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userRepository).toBeDefined();
    expect(userBookRepository).toBeDefined();
    expect(bookRepository).toBeDefined();
  });
});
