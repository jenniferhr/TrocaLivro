import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserBooksTable1728875404443 implements MigrationInterface {
    name = 'CreateUserBooksTable1728875404443'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."user_books_condition_enum" AS ENUM('new', 'like_new', 'used', 'damaged')`);
        await queryRunner.query(`CREATE TYPE "public"."user_books_available_enum" AS ENUM('available', 'exchanged', 'reserved')`);
        await queryRunner.query(`CREATE TABLE "user_books" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "condition" "public"."user_books_condition_enum" NOT NULL, "available" "public"."user_books_available_enum" NOT NULL, "comment" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" bigint NOT NULL, "book_id" bigint NOT NULL, CONSTRAINT "PK_629bc1a648860619b0f75f5dfe6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_books" ADD CONSTRAINT "FK_e746bb935afa81fbcaed41036f1" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_books" ADD CONSTRAINT "FK_2cf4aaa9d796a62fe330a799822" FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_books" DROP CONSTRAINT "FK_2cf4aaa9d796a62fe330a799822"`);
        await queryRunner.query(`ALTER TABLE "user_books" DROP CONSTRAINT "FK_e746bb935afa81fbcaed41036f1"`);
        await queryRunner.query(`DROP TABLE "user_books"`);
        await queryRunner.query(`DROP TYPE "public"."user_books_available_enum"`);
        await queryRunner.query(`DROP TYPE "public"."user_books_condition_enum"`);
    }

}
