import { DynamicModule, Module, Type } from '@nestjs/common';
import { UsersService } from 'src/users/application/services/users.service';
import { UsersController } from 'src/users/http-server/controllers/users.controller';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {
  static withInfrastructure(infrastructureModule: Type | DynamicModule) {
    return {
      module: UsersModule,
      imports: [infrastructureModule],
    };
  }
}
