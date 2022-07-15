import { MigrationInterface, QueryRunner } from "typeorm";

export class portfolioCreatedAt1657229812100 implements MigrationInterface {
    name = 'portfolioCreatedAt1657229812100'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "portfolio" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "portfolio" DROP COLUMN "created_at"`);
    }

}
