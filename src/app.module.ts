import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthModule } from './health/infrastructure/modules/health.module';
import { UsersModule } from './infrastructure/modules/users.module';
import { ApplicationBootstrapOptions } from './users/interfaces/application-bootstrap-options.interface';
import { CoreModule } from './users/core/core.module';
import { UserInfrastructureModule } from './infrastructure/persistence/user-infrastructure.module';

@Module({
  imports: [HealthModule, CoreModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  static register(options: ApplicationBootstrapOptions) {
    return {
      module: AppModule,
      imports: [
        CoreModule.forRoot(options),
        UsersModule.withInfrastructure(
          UserInfrastructureModule.use(options.driver),
        ),
      ],
    };
  }
}
