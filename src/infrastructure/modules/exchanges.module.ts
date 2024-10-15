import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExchangesService } from 'src/exchanges/application/services/exchanges.service';
import { ExchangesController } from 'src/exchanges/http-server/controllers/exchanges.controller';
import { ExchangeEntity } from '../persistence/typeorm/entities/exchange.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ExchangeEntity])],
  controllers: [ExchangesController],
  providers: [ExchangesService],
})
export class ExchangesModule {}
