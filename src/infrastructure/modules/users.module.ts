import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../persistence/typeorm/entities/user.entity';
import { UsersService } from 'src/users/application/services/users.service';
import { UsersController } from 'src/users/http-server/controllers/users.controller';
import { UserBooksService } from 'src/users/application/services/user-books.service';
import { UserBookEntity } from '../persistence/typeorm/entities/user-book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, UserBookEntity])],
  providers: [UsersService, UserBooksService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
