import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsersTable1728609032709 implements MigrationInterface {
    name = 'CreateUsersTable1728609032709'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" BIGSERIAL NOT NULL, "full_name" character varying NOT NULL, "email" character varying NOT NULL, "phone_number" character varying NOT NULL, "address" character varying NOT NULL, "books" json, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
