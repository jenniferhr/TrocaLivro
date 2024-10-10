import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmUserPersistenceModule } from '../infrastructure/persistence/typeorm/typeorm-persistence.module';
import { ApplicationBootstrapOptions } from '../interfaces/application-bootstrap-options.interface';

@Module({})
export class CoreModule {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static forRoot(options: ApplicationBootstrapOptions): DynamicModule {
    const imports = [];

    if (options.driver === 'typeorm') {
      imports.push(TypeOrmUserPersistenceModule);
    } else if (options.driver === 'in-memory') {
      throw new Error('Not implemented.');
    } else if (options.driver === 'in-file') {
      throw new Error('Not implementedo.');
    }

    return {
      module: CoreModule,
      imports,
    };
  }
}
