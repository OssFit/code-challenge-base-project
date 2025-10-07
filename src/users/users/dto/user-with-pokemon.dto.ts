import { ApiProperty } from '@nestjs/swagger';
import { PokemonDetails } from 'src/clients/clients/pokemon.client';
import { User } from '../users.entity';

export class UserWithPokemonDto {
  @ApiProperty({
    description: 'The id of the user',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'The username of the user',
    example: 'oss_dev',
  })
  username: string;

  @ApiProperty({
    description: 'The email of the user',
    example: 'oss_dev@dev.com',
  })
  email: string;

  @ApiProperty({
    description: 'The pokemon ids of the user',
    example: [1, 2, 3],
  })
  pokemonIds: number[];

  @ApiProperty({
    description: 'The pokemon of the user',
    example: [{ id: 1, name: 'pikachu' }],
  })
  pokemon: PokemonDetails[];
  @ApiProperty({
    description: 'The password of the user',
    example: 'password',
  })
  password: string;

  constructor(user: User, pokemon: PokemonDetails[]) {
    this.id = user.id;
    this.username = user.username;
    this.email = user.email;
    this.pokemonIds = user.pokemonIds;
    this.pokemon = pokemon;
    this.password = user.password;
  }
}
