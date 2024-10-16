import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateExchangesTable1729035186305 implements MigrationInterface {
    name = 'CreateExchangesTable1729035186305'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."exchanges_status_enum" AS ENUM('pending', 'accepted', 'rejected', 'canceled')`);
        await queryRunner.query(`CREATE TABLE "exchanges" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "status" "public"."exchanges_status_enum" NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "offered_user_book_id" uuid NOT NULL, "requested_user_book_id" uuid NOT NULL, CONSTRAINT "PK_17ccd29473f939c68de98c2cea3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "exchanges" ADD CONSTRAINT "FK_5b370ad70553a9e945348512423" FOREIGN KEY ("offered_user_book_id") REFERENCES "user_books"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "exchanges" ADD CONSTRAINT "FK_3893c55cc38b503cbc6255b93e3" FOREIGN KEY ("requested_user_book_id") REFERENCES "user_books"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "exchanges" DROP CONSTRAINT "FK_3893c55cc38b503cbc6255b93e3"`);
        await queryRunner.query(`ALTER TABLE "exchanges" DROP CONSTRAINT "FK_5b370ad70553a9e945348512423"`);
        await queryRunner.query(`DROP TABLE "exchanges"`);
        await queryRunner.query(`DROP TYPE "public"."exchanges_status_enum"`);
    }

}
