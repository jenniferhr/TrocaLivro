import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateExchangeDto } from '../../http-server/dto/create-exchange.dto';
import { ExchangeStatusEnum } from './../../../exchanges/domain/enums/exchange-status.enum';
import { ExchangeEntity } from './../../../infrastructure/persistence/typeorm/entities/exchange.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserBookEntity } from './../../../infrastructure/persistence/typeorm/entities/user-book.entity';
import { BookAvailabilityEnum } from './../../../books/domain/enums/book-availability.enum';

@Injectable()
export class ExchangesService {
  constructor(
    @InjectRepository(ExchangeEntity)
    private readonly exchangeRepository: Repository<ExchangeEntity>,
    @InjectRepository(UserBookEntity)
    private readonly userBookRepository: Repository<UserBookEntity>,
  ) {}

  async createExchangeRequest(createExchangeDto: CreateExchangeDto) {
    // TODO: refactor to turn these initial validations into auxiliary functions
    const { offeredUserBookId, requestedUserBookId } = createExchangeDto;

    if (offeredUserBookId === requestedUserBookId) {
      throw new BadRequestException(
        'The request and offered books should not be the same book owned by the same person.',
      );
    }

    const offeredUserBook = await this.userBookRepository.findOne({
      where: { id: offeredUserBookId },
      relations: ['user', 'book'],
    });
    const requestedUserBook = await this.userBookRepository.findOne({
      where: { id: requestedUserBookId },
      relations: ['user', 'book'],
    });

    if (!offeredUserBook || !requestedUserBook) {
      throw new NotFoundException('One of the userBooks was not found.');
    }

    if (offeredUserBook.user.id === requestedUserBook.user.id) {
      throw new BadRequestException(
        'The offered and requested books should belong to different users.',
      );
    }

    if (
      offeredUserBook.available !== BookAvailabilityEnum.AVAILABLE ||
      requestedUserBook.available !== BookAvailabilityEnum.AVAILABLE
    ) {
      throw new BadRequestException('Both books should be available.');
    }

    const existingExchange = await this.exchangeRepository.findOne({
      where: {
        offeredUserBook,
        requestedUserBook,
      },
    });

    if (existingExchange) {
      throw new BadRequestException(
        'An exchange between the two books already exists.',
      );
    }

    const newExchange = this.exchangeRepository.create({
      offeredUserBook,
      requestedUserBook,
      status: ExchangeStatusEnum.PENDING,
    });

    await this.exchangeRepository.save(newExchange);

    return newExchange;
  }

  async findAllExchanges() {
    try {
      const exchanges = await this.exchangeRepository.find({
        relations: [
          'offeredUserBook',
          'offeredUserBook.user',
          'offeredUserBook.book',
          'requestedUserBook',
          'requestedUserBook.user',
          'requestedUserBook.book',
        ],
      });

      return exchanges;
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
}
