import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { dataSourceOptions } from './infrastructure/persistence/typeorm/typeOrm.config';
import { HealthModule } from './infrastructure/modules/health.module';
import { UsersModule } from './infrastructure/modules/users.module';
import { BooksModule } from './infrastructure/modules/books.module';
import { ExchangesModule } from './infrastructure/modules/exchanges.module';
@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    HealthModule,
    UsersModule,
    BooksModule,
    ExchangesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
