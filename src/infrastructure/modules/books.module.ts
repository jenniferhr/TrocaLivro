import { Module } from '@nestjs/common';
import { BooksService } from '../../books/application/services/books.service';
import { BooksController } from '../../books/http-server/controllers/books.controller';

@Module({
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
