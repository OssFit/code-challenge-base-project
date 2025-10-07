import { ApiProperty } from '@nestjs/swagger';
import { User } from '../users.entity';

export class UserResponseDto {
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

  constructor(user: User) {
    this.id = user.id;
    this.username = user.username;
    this.email = user.email;
  }
}
