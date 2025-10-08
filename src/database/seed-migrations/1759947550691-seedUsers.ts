import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedUsers1759947550691 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Insert 3 users with sample data
    await queryRunner.query(`
      INSERT INTO users (username, email, password, "pokemonIds") VALUES
      ('ash_ketchum', 'ash@pokemon.com', '$2b$10$rQZ8K9vL3mN2pQ1sT5uY7e', ARRAY[1, 4, 7, 25]),
      ('misty_water', 'misty@cerulean.com', '$2b$10$rQZ8K9vL3mN2pQ1sT5uY7e', ARRAY[7, 54, 55, 120]),
      ('brock_rock', 'brock@pewter.com', '$2b$10$rQZ8K9vL3mN2pQ1sT5uY7e', ARRAY[74, 75, 95, 111])
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remove the seeded users
    await queryRunner.query(`
      DELETE FROM users WHERE username IN ('ash_ketchum', 'misty_water', 'brock_rock')
    `);
  }
}
