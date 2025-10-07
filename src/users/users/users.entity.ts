import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  username: string;
  @Column({ unique: true })
  email: string;
  @Column()
  password: string;
  @Column('int', { array: true, nullable: true })
  pokemonIds: number[];

  constructor(
    id: number,
    username: string,
    email: string,
    password: string,
    pokemonIds: number[],
  ) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
    this.pokemonIds = pokemonIds;
  }
}
