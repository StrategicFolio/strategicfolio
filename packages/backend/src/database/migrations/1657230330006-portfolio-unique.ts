import { MigrationInterface, QueryRunner } from "typeorm";

export class portfolioUnique1657230330006 implements MigrationInterface {
    name = 'portfolioUnique1657230330006'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "portfolio" ADD CONSTRAINT "UQ_e0cf3de1fa085aa0dba5e4ec528" UNIQUE ("name", "user_id")`);
        await queryRunner.query(`ALTER TABLE "portfolio" ADD CONSTRAINT "UQ_5ef13c345c2cd2fbe733711f667" UNIQUE ("address", "user_id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "portfolio" DROP CONSTRAINT "UQ_5ef13c345c2cd2fbe733711f667"`);
        await queryRunner.query(`ALTER TABLE "portfolio" DROP CONSTRAINT "UQ_e0cf3de1fa085aa0dba5e4ec528"`);
    }

}
