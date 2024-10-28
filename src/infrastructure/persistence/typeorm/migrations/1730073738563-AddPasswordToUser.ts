import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPasswordToUser1730073738563 implements MigrationInterface {
    name = 'AddPasswordToUser1730073738563'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "password" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
    }

}
