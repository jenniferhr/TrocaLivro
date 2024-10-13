import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateBooksTable1728851940774 implements MigrationInterface {
    name = 'CreateBooksTable1728851940774'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "books" ("id" BIGSERIAL NOT NULL, "title" character varying NOT NULL, "author" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_f3f2f25a099d24e12545b70b022" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "books"`);
    }

}
