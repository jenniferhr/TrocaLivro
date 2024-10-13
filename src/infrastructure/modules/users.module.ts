import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../persistence/typeorm/entities/user.entity';
import { UsersService } from 'src/users/application/services/users.service';
import { UsersController } from 'src/users/http-server/controllers/users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
