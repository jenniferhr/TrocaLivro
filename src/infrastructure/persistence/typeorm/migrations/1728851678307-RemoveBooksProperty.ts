import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveBooksProperty1728851678307 implements MigrationInterface {
    name = 'RemoveBooksProperty1728851678307'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "books"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "books" json`);
    }

}
