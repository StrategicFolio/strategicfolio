import { MigrationInterface, QueryRunner } from "typeorm";

export class userToken1657280455459 implements MigrationInterface {
    name = 'userToken1657280455459'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "hash"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "hash_valid_until"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "token" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "token_expired_at" TIMESTAMP WITH TIME ZONE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "token_expired_at"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "token"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "hash_valid_until" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "user" ADD "hash" character varying`);
    }

}
