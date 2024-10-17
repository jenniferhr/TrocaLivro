import { Test, TestingModule } from '@nestjs/testing';
import { ExchangesController } from './exchanges.controller';
import { ExchangesService } from '../../application/services/exchanges.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ExchangeEntity } from './../../../infrastructure/persistence/typeorm/entities/exchange.entity';
import { UserBookEntity } from './../../../infrastructure/persistence/typeorm/entities/user-book.entity';
import { Repository } from 'typeorm';

describe('ExchangesController', () => {
  let controller: ExchangesController;
  let exchangeRepository: Repository<ExchangeEntity>;
  let userBookRepository: Repository<UserBookEntity>;

  beforeEach(async () => {
    const mockExchangeRepository =
      jest.createMockFromModule<Repository<ExchangeEntity>>('@nestjs/typeorm');
    const mockUserBookRepository =
      jest.createMockFromModule<Repository<UserBookEntity>>('@nestjs/typeorm');

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExchangesController],
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

    controller = module.get<ExchangesController>(ExchangesController);
    exchangeRepository = module.get<Repository<ExchangeEntity>>(
      getRepositoryToken(ExchangeEntity),
    ) as jest.Mocked<Repository<ExchangeEntity>>;
    userBookRepository = module.get<Repository<UserBookEntity>>(
      getRepositoryToken(UserBookEntity),
    ) as jest.Mocked<Repository<UserBookEntity>>;

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(exchangeRepository).toBeDefined();
    expect(userBookRepository).toBeDefined();
  });
});
