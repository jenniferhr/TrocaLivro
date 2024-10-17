import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExchangesService } from './../../exchanges/application/services/exchanges.service';
import { ExchangesController } from './../../exchanges/http-server/controllers/exchanges.controller';
import { ExchangeEntity } from '../persistence/typeorm/entities/exchange.entity';
import { UserBookEntity } from '../persistence/typeorm/entities/user-book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ExchangeEntity, UserBookEntity])],
  controllers: [ExchangesController],
  providers: [ExchangesService],
})
export class ExchangesModule {}
