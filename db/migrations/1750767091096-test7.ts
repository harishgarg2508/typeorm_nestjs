import { MigrationInterface, QueryRunner } from "typeorm";

export class Test71750767091096 implements MigrationInterface {
    name = 'Test71750767091096'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" ADD "author1" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "author1"`);
    }

}
