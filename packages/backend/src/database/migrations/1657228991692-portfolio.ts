import { MigrationInterface, QueryRunner } from "typeorm";

export class portfolio1657228991692 implements MigrationInterface {
    name = 'portfolio1657228991692'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."portfolio_type_enum" AS ENUM('metamask')`);
        await queryRunner.query(`CREATE TABLE "portfolio" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "address" character varying NOT NULL, "type" "public"."portfolio_type_enum" NOT NULL, CONSTRAINT "PK_6936bb92ca4b7cda0ff28794e48" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "portfolio"`);
        await queryRunner.query(`DROP TYPE "public"."portfolio_type_enum"`);
    }

}
