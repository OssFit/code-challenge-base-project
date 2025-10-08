import { DataSource } from 'typeorm';
import { User } from './users/users/users.entity';
import { join } from 'path';
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});

// Get environment variables with fallbacks
const url = process.env.SCHEMATOGO_URL;
const host = process.env.POSTGRES_HOST || 'localhost';
const port = parseInt(process.env.POSTGRES_PORT || '5432');
const username = process.env.POSTGRES_USER || 'postgres';
const password = process.env.POSTGRES_PASSWORD || 'postgres';
const database = process.env.POSTGRES_DB || 'postgres';
const synchronize = process.env.POSTGRES_SYNC === 'true' ? true : false;

// Create data source configuration
const dataSourceConfig = url
  ? {
      type: 'postgres' as const,
      url,
      entities: [User],
      synchronize,
      migrations: [join(__dirname, '..', 'migrations', '*.{ts,js}')],
    }
  : {
      type: 'postgres' as const,
      host,
      port,
      username,
      password,
      database,
      entities: [User],
      synchronize,
      migrations: [
        join(__dirname, '..', 'migrations', '*.{ts,js}'),
        join(__dirname, '..', 'seed-migrations', '*.{ts,js}'),
      ],
      migrationsTableName: 'custom_migration_table',
    };

export const AppDataSource = new DataSource(dataSourceConfig);
