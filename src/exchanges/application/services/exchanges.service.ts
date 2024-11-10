import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateExchangeDto } from '../../http-server/dto/create-exchange.dto';
import { ExchangeStatusEnum } from 'src/exchanges/domain/enums/exchange-status.enum';
import { ExchangeEntity } from 'src/infrastructure/persistence/typeorm/entities/exchange.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserBookEntity } from 'src/infrastructure/persistence/typeorm/entities/user-book.entity';
import { BookAvailabilityEnum } from 'src/books/domain/enums/book-availability.enum';
import { FindExchangesByCriteriaDto } from 'src/exchanges/http-server/dto/find-exchanges-by-criteria.dto';

@Injectable()
export class ExchangesService {
  constructor(
    @InjectRepository(ExchangeEntity)
    private readonly exchangeRepository: Repository<ExchangeEntity>,
    @InjectRepository(UserBookEntity)
    private readonly userBookRepository: Repository<UserBookEntity>,
  ) {}

  async createExchangeRequest(createExchangeDto: CreateExchangeDto) {
    const { offeredUserBookId, requestedUserBookId } = createExchangeDto;

    if (offeredUserBookId === requestedUserBookId) {
      throw new BadRequestException(
        'The request and offered books should not be the same book owned by the same person.',
      );
    }

    const offeredUserBook =
      await this.validateAndFetchAvailableUserBook(offeredUserBookId);
    const requestedUserBook =
      await this.validateAndFetchAvailableUserBook(requestedUserBookId);

    if (offeredUserBook.user.id === requestedUserBook.user.id) {
      throw new BadRequestException(
        'The offered and requested books should belong to different users.',
      );
    }

    await this.ensureNoExistingExchange(offeredUserBook, requestedUserBook);

    const newExchange = await this.exchangeRepository.create({
      offeredUserBook,
      requestedUserBook,
      status: ExchangeStatusEnum.PENDING,
    });

    await this.exchangeRepository.save(newExchange);

    return newExchange;
  }

  async findByCriteria(findByCriteriaDto: FindExchangesByCriteriaDto) {
    const { status } = findByCriteriaDto;

    let query = await this.exchangeRepository
      .createQueryBuilder('exchange')
      .leftJoinAndSelect('exchange.offeredUserBook', 'offeredUserBook')
      .leftJoinAndSelect('offeredUserBook.user', 'offeredUser')
      .leftJoinAndSelect('offeredUserBook.book', 'offeredBook')
      .leftJoinAndSelect('exchange.requestedUserBook', 'requestedUserBook')
      .leftJoinAndSelect('requestedUserBook.user', 'requestedUser')
      .leftJoinAndSelect('requestedUserBook.book', 'requestedBook');

    if (status) {
      query = query.andWhere('exchange.status = :status', { status });
    }

    try {
      return await query.getMany();
    } catch (error) {
      throw error;
    }
  }

  async findOneExchange(exchangeId: string) {
    try {
      const exchange = await this.exchangeRepository.findOne({
        where: { id: exchangeId },
        relations: [
          'offeredUserBook',
          'offeredUserBook.user',
          'offeredUserBook.book',
          'requestedUserBook',
          'requestedUserBook.user',
          'requestedUserBook.book',
        ],
      });

      if (!exchange) {
        throw new NotFoundException(
          `Exchange with ID ${exchangeId} not found.`,
        );
      }

      return exchange;
    } catch (error) {
      throw error;
    }
  }

  async updateExchangeStatus(exchangeId: string, status: ExchangeStatusEnum) {
    try {
      const exchange = await this.exchangeRepository.findOne({
        where: { id: exchangeId },
      });

      if (!exchange) {
        throw new NotFoundException(
          `Exchange with ID ${exchangeId} not found.`,
        );
      }

      exchange.status = status;

      const updatedExchange = await this.exchangeRepository.save(exchange);

      return updatedExchange;
    } catch (error) {
      throw error;
    }
  }

  async validateAndFetchAvailableUserBook(userBookId: string) {
    const userBook = await this.userBookRepository.findOne({
      where: { id: userBookId },
      relations: ['user', 'book'],
    });

    if (!userBook) {
      throw new NotFoundException(`UserBook with ID ${userBookId} not found.`);
    }

    if (userBook.available !== BookAvailabilityEnum.AVAILABLE) {
      throw new BadRequestException(
        `UserBook with ID ${userBookId} is not available.`,
      );
    }

    return userBook;
  }

  async ensureNoExistingExchange(
    offeredUserBook: UserBookEntity,
    requestedUserBook: UserBookEntity,
  ) {
    try {
      const existingExchange = await this.exchangeRepository.findOne({
        where: [
          {
            offeredUserBook: { id: offeredUserBook.id },
            requestedUserBook: { id: requestedUserBook.id },
          },
          {
            offeredUserBook: { id: requestedUserBook.id },
            requestedUserBook: { id: offeredUserBook.id },
          },
        ],
      });

      if (existingExchange) {
        throw new BadRequestException(
          'An exchange between the two books already exists.',
        );
      }
    } catch (error) {
      throw error;
    }
  }
}
