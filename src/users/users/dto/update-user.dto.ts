import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({
    description: 'The username of the user',
    example: 'oss_dev',
    required: false,
  })
  username?: string;

  @ApiProperty({
    description: 'The email of the user',
    example: 'oss_dev@dev.com',
    required: false,
  })
  email?: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'password',
    required: false,
  })
  password?: string;

  @ApiProperty({
    description: 'The pokemon ids of the user',
    example: [1, 2, 3],
    required: false,
  })
  pokemonIds?: number[];
}
