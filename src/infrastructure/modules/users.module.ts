import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../persistence/typeorm/entities/user.entity';
import { UsersService } from './../../users/application/services/users.service';
import { UsersController } from './../../users/http-server/controllers/users.controller';
import { UserBooksService } from './../../users/application/services/user-books.service';
import { UserBookEntity } from '../persistence/typeorm/entities/user-book.entity';
import { BookEntity } from '../persistence/typeorm/entities/book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, UserBookEntity, BookEntity])],
  providers: [UsersService, UserBooksService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
