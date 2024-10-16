import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  ParseUUIDPipe,
  ParseEnumPipe,
} from '@nestjs/common';
import { ExchangesService } from '../../application/services/exchanges.service';
import { CreateExchangeDto } from '../dto/create-exchange.dto';
import { ExchangeStatusEnum } from 'src/exchanges/domain/enums/exchange-status.enum';

@Controller('exchanges')
export class ExchangesController {
  constructor(private readonly exchangesService: ExchangesService) {}

  @Post()
  create(@Body() createExchangeDto: CreateExchangeDto) {
    try {
      return this.exchangesService.createExchangeRequest(createExchangeDto);
    } catch (error) {
      throw error;
    }
  }

  @Get()
  findAll() {
    return this.exchangesService.findAllExchanges();
  }

  @Get(':exchangeId')
  findOne(@Param('exchangeId', new ParseUUIDPipe()) exchangeId: string) {
    return this.exchangesService.findOneExchange(exchangeId);
  }

  @Patch(':exchangeId')
  updateStatus(
    @Param('exchangeId', new ParseUUIDPipe()) exchangeId: string,
    @Query('status', new ParseEnumPipe(ExchangeStatusEnum))
    status: ExchangeStatusEnum,
  ) {
    return this.exchangesService.updateExchangeStatus(exchangeId, status);
  }
}
