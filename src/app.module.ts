import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthModule } from './health/infrastructure/modules/health.module';
import { UsersModule } from './users/infrastructure/modules/users.module';

@Module({
  imports: [HealthModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
