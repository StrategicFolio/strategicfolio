import { MigrationInterface, QueryRunner } from "typeorm";

export class pair1657367699260 implements MigrationInterface {
    name = 'pair1657367699260'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "pair" ("pair" character varying NOT NULL, "token0" character varying NOT NULL, "token1" character varying NOT NULL, CONSTRAINT "PK_ca3040d5e2680ccca49c4c4f2e5" PRIMARY KEY ("pair"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "pair"`);
    }

}
