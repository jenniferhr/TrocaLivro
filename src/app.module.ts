import { Module } from '@nestjs/common';
import { AppController } from './http-server/controllers/app.controller';
import { AppService } from './application/services/app.service';
import { HealthModule } from './infrastructure/modules/health.module';

@Module({
  imports: [HealthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
