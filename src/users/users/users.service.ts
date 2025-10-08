import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from './users.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserWithPokemonDto } from './dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.findAll();
  }

  async findById(id: number): Promise<User> {
    const user = await this.usersRepository.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findByIdWithPokemon(id: number): Promise<UserWithPokemonDto> {
    const user = await this.usersRepository.findByIdWithPokemon(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return new UserWithPokemonDto(user.user, user.pokemon);
  }

  create(user: User): Promise<User> {
    return this.usersRepository.create(user);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User | null> {
    const existingUser = await this.usersRepository.findById(id);
    if (!existingUser) {
      throw new NotFoundException('User not found');
    }

    // Create updated user with existing data and new data
    const updatedUser = new User(
      id,
      updateUserDto.username ?? existingUser.username,
      updateUserDto.email ?? existingUser.email,
      updateUserDto.password ?? existingUser.password,
      updateUserDto.pokemonIds ?? existingUser.pokemonIds,
    );

    return this.usersRepository.update(id, updatedUser);
  }
}
