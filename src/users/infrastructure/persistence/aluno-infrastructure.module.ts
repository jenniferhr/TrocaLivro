import { Module } from '@nestjs/common';
import { TypeOrmUserPersistenceModule } from './typeorm/typeorm-persistence.module';

@Module({})
export class UserInfrastructureModule {
  static use(driver: 'in-file' | 'in-memory' | 'typeorm') {
    let persistenceModule;

    if (driver === 'typeorm') {
      persistenceModule = TypeOrmUserPersistenceModule;
    } else if (driver === 'in-file' || driver === 'in-memory') {
      throw new Error('Persistence not implemented yet.');
    } else {
      throw new Error('Invalid driver.');
    }

    return {
      module: UserInfrastructureModule,
      imports: [persistenceModule],
      exports: [persistenceModule],
    };
  }
}
