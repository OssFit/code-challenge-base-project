// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import { User } from '../users/users/users.entity';

// @Module({
//   imports: [
//     TypeOrmModule.forRootAsync({
//       imports: [ConfigModule],
//       useFactory: (configService: ConfigService) => ({
//         type: 'postgres',
//         host: configService.get('POSTGRES_HOST', 'localhost'),
//         port: configService.get('POSTGRES_PORT', 5432),
//         username: configService.get('POSTGRES_USER', 'postgres'),
//         password: configService.get('POSTGRES_PASSWORD', 'postgres'),
//         database: configService.get('POSTGRES_DB', 'postgres'),
//         entities: [User],
//         synchronize: configService.get('NODE_ENV') !== 'production',
//       }),
//       inject: [ConfigService],
//     }),
//   ],
// })
// export class DatabaseModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from '../data-source';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        // If AppDataSource is not initialized, initialize it
        if (!AppDataSource.isInitialized) {
          await AppDataSource.initialize();
        }

        // Return the options from AppDataSource
        return {
          ...AppDataSource.options,
          autoLoadEntities: true,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
