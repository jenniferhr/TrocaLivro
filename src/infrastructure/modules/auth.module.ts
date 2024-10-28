import { Module } from '@nestjs/common';
import { AuthService } from '../../auth/application/services/auth.service';
import { AuthController } from '../../auth/http-server/controllers/auth.controller';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
