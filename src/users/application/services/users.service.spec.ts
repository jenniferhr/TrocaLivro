import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { Repository } from 'typeorm';
import { UserEntity } from './../../../infrastructure/persistence/typeorm/entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserBookEntity } from './../../../infrastructure/persistence/typeorm/entities/user-book.entity';
import { BookEntity } from './../../../infrastructure/persistence/typeorm/entities/book.entity';
import { UserBooksService } from './user-books.service';

describe.only('UsersService', () => {
  let service: UsersService;
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
        UsersService,
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

    service = module.get<UsersService>(UsersService);
    userRepository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    ) as jest.Mocked<Repository<UserEntity>>;
    userBookRepository = module.get<Repository<UserBookEntity>>(
      getRepositoryToken(UserBookEntity),
    ) as jest.Mocked<Repository<UserBookEntity>>;
    bookRepository = module.get<Repository<BookEntity>>(
      getRepositoryToken(BookEntity),
    ) as jest.Mocked<Repository<BookEntity>>;

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userRepository).toBeDefined();
    expect(userBookRepository).toBeDefined();
    expect(bookRepository).toBeDefined();
  });
});
