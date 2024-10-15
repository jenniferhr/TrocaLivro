import { Injectable } from '@nestjs/common';
import { CreateExchangeDto } from '../../http-server/dto/create-exchange.dto';
import { UpdateExchangeDto } from '../../http-server/dto/update-exchange.dto';

@Injectable()
export class ExchangesService {
  create(createExchangeDto: CreateExchangeDto) {
    return 'This action adds a new exchange';
  }

  findAll() {
    return `This action returns all exchanges`;
  }

  findOne(id: number) {
    return `This action returns a #${id} exchange`;
  }

  update(id: number, updateExchangeDto: UpdateExchangeDto) {
    return `This action updates a #${id} exchange`;
  }

  remove(id: number) {
    return `This action removes a #${id} exchange`;
  }
}
