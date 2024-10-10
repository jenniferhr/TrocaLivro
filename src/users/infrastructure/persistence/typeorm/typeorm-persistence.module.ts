import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './typeOrm.config';
import { UserEntity } from './entities/user.entity';
import { UserRepository } from 'src/users/application/ports/user.repository';
import { TypeOrmUserRepository } from './repositories/user.repository';
import { UserMapper } from './mappers/user.mapper';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  providers: [
    {
      provide: UserRepository,
      useClass: TypeOrmUserRepository, // É aqui que nós vinculamos uma porta e a um adaptador (a ideia aqui é dizer para o NestJS usar o InMemoryAlunoRepository sempre que alguém pedir por um AlunoRepository - isso facilita muito a troca de adaptadores, vc não precisa mudar nada no resto do código, só aqui).
    },
    UserMapper,
  ],
  exports: [UserRepository, TypeOrmModule],
})
export class TypeOrmUserPersistenceModule {}
