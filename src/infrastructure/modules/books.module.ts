import { Module } from '@nestjs/common';
import { BooksService } from '../../books/application/services/books.service';
import { BooksController } from '../../books/http-server/controllers/books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookEntity } from '../persistence/typeorm/entities/book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BookEntity])],
  controllers: [BooksController],
  providers: [BooksService],
  exports: [BooksService],
})
export class BooksModule {}
