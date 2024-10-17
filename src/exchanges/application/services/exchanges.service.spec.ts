import { Test, TestingModule } from '@nestjs/testing';
import { ExchangesService } from './exchanges.service';
import { ExchangeEntity } from './../../../infrastructure/persistence/typeorm/entities/exchange.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserBookEntity } from './../../../infrastructure/persistence/typeorm/entities/user-book.entity';

describe('ExchangesService', () => {
  let service: ExchangesService;
  let exchangeRepository: Repository<ExchangeEntity>;
  let userBookRepository: Repository<UserBookEntity>;

  beforeEach(async () => {
    7;
    const mockExchangeRepository =
      jest.createMockFromModule<Repository<ExchangeEntity>>('@nestjs/typeorm');
    const mockUserBookRepository =
      jest.createMockFromModule<Repository<UserBookEntity>>('@nestjs/typeorm');

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExchangesService,
        {
          provide: getRepositoryToken(ExchangeEntity),
          useValue: mockExchangeRepository,
        },
        {
          provide: getRepositoryToken(UserBookEntity),
          useValue: mockUserBookRepository,
        },
      ],
    }).compile();

    service = module.get<ExchangesService>(ExchangesService);
    exchangeRepository = module.get<Repository<ExchangeEntity>>(
      getRepositoryToken(ExchangeEntity),
    ) as jest.Mocked<Repository<ExchangeEntity>>;
    userBookRepository = module.get<Repository<UserBookEntity>>(
      getRepositoryToken(UserBookEntity),
    ) as jest.Mocked<Repository<UserBookEntity>>;

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(exchangeRepository).toBeDefined();
    expect(userBookRepository).toBeDefined();
  });
});
