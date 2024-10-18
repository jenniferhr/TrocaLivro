import { DataSource, DataSourceOptions } from 'typeorm';
import 'dotenv/config';
const isProduction = process.env.NODE_ENV === 'production';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: String(process.env.DB_PASSWORD),
  database: process.env.DB_NAME,
  logging: true,
  migrations: [`${__dirname}/migrations/*.{ts,js}`],
  entities: [`${__dirname}/entities/*.{ts,js}`],
  migrationsRun: true,
  ssl: isProduction ? true : false,
  extra: isProduction
    ? {
        ssl: {
          rejectUnauthorized: false,
        },
      }
    : {},
};

export default new DataSource(dataSourceOptions);
