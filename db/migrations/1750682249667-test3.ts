import { MigrationInterface, QueryRunner } from "typeorm";

export class Test31750682249667 implements MigrationInterface {
    name = 'Test31750682249667'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "phone" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "test" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "test3" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "test3"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "test"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "phone"`);
    }

}
