import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExchangesService } from 'src/exchanges/application/services/exchanges.service';
import { ExchangesController } from 'src/exchanges/http-server/controllers/exchanges.controller';
import { ExchangeEntity } from '../persistence/typeorm/entities/exchange.entity';
import { UserBookEntity } from '../persistence/typeorm/entities/user-book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ExchangeEntity, UserBookEntity])],
  controllers: [ExchangesController],
  providers: [ExchangesService],
})
export class ExchangesModule {}
