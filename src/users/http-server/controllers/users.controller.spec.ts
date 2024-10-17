import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from '../../application/services/users.service';
import { Repository } from 'typeorm';
import { UserEntity } from './../../../infrastructure/persistence/typeorm/entities/user.entity';
import { UserBookEntity } from './../../../infrastructure/persistence/typeorm/entities/user-book.entity';
import { BookEntity } from './../../../infrastructure/persistence/typeorm/entities/book.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserBooksService } from './../../../users/application/services/user-books.service';

describe.only('UsersController', () => {
  let controller: UsersController;
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
      controllers: [UsersController],
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

    controller = module.get<UsersController>(UsersController);
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
    expect(controller).toBeDefined();
    expect(userRepository).toBeDefined();
    expect(userBookRepository).toBeDefined();
    expect(bookRepository).toBeDefined();
  });
});
