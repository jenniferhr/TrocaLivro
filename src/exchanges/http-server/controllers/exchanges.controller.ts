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
import {
  ApiTags,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { ExchangeEntity } from 'src/infrastructure/persistence/typeorm/entities/exchange.entity';

@ApiTags('exchanges')
@Controller('exchanges')
export class ExchangesController {
  constructor(private readonly exchangesService: ExchangesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new exchange request' })
  @ApiCreatedResponse({
    description: 'Exchange request created successfully.',
    type: CreateExchangeDto,
  })
  @ApiBadRequestResponse({ description: 'Invalid input data.' })
  @ApiNotFoundResponse({
    description: 'One or both user books were not found.',
  })
  create(@Body() createExchangeDto: CreateExchangeDto) {
    try {
      return this.exchangesService.createExchangeRequest(createExchangeDto);
    } catch (error) {
      throw error;
    }
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all exchange requests' })
  @ApiOkResponse({
    description: 'List of exchange requests retrieved successfully.',
    type: Array<ExchangeEntity>,
  })
  findAll() {
    return this.exchangesService.findAllExchanges();
  }

  @Get(':exchangeId')
  @ApiOperation({ summary: 'Retrieve a specific exchange request by ID' })
  @ApiParam({
    name: 'exchangeId',
    description: 'UUID of the exchange request',
    type: String,
  })
  @ApiOkResponse({
    description: 'Exchange request retrieved successfully.',
    type: ExchangeEntity,
  })
  @ApiNotFoundResponse({ description: 'Exchange not found.' })
  findOne(@Param('exchangeId', new ParseUUIDPipe()) exchangeId: string) {
    return this.exchangesService.findOneExchange(exchangeId);
  }

  @Patch(':exchangeId')
  @ApiOperation({ summary: 'Update the status of a specific exchange request' })
  @ApiParam({
    name: 'exchangeId',
    description: 'UUID of the exchange request',
    type: String,
  })
  @ApiQuery({
    name: 'status',
    description: 'New status of the exchange request',
    enum: ExchangeStatusEnum,
    required: true,
  })
  @ApiOkResponse({
    description: 'Exchange status updated successfully.',
    type: ExchangeEntity,
  })
  @ApiBadRequestResponse({ description: 'Invalid input data.' })
  @ApiNotFoundResponse({ description: 'Exchange not found.' })
  updateStatus(
    @Param('exchangeId', new ParseUUIDPipe()) exchangeId: string,
    @Query('status', new ParseEnumPipe(ExchangeStatusEnum))
    status: ExchangeStatusEnum,
  ) {
    return this.exchangesService.updateExchangeStatus(exchangeId, status);
  }
}
