import { Module } from '@nestjs/common';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { UsersRepository } from './users/users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/users.entity';
import { ClientsModule } from '../clients/clients/clients.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), ClientsModule],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService],
})
export class UsersModule {}
