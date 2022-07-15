import { MigrationInterface, QueryRunner } from "typeorm";

export class pairExchange1657730585262 implements MigrationInterface {
    name = 'pairExchange1657730585262'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pair" ADD "exchange" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pair" DROP COLUMN "exchange"`);
    }

}
