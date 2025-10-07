import { Injectable } from '@nestjs/common';
import { User } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  PokemonClient,
  PokemonDetails,
} from '../../clients/clients/pokemon.client';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private pokemonClient: PokemonClient,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findById(id: number): Promise<User | null> {
    return this.usersRepository.findOne({ where: { id } });
  }

  createOrUpdate(user: User): Promise<User> {
    return this.usersRepository.save(user);
  }

  async findByIdWithPokemon(
    id: number,
  ): Promise<{ user: User; pokemon: PokemonDetails[] } | null> {
    const user = await this.findById(id);
    if (!user) {
      return null;
    }
    const pokemon = await this.pokemonClient.getPokemonDetailsByIds(
      user.pokemonIds,
    );
    return { user, pokemon };
  }
}
