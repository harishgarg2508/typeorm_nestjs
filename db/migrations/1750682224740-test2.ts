import { MigrationInterface, QueryRunner } from "typeorm";

export class Test21750682224740 implements MigrationInterface {
    name = 'Test21750682224740'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "phone" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "test" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "test"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "phone"`);
    }

}
