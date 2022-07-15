import { MigrationInterface, QueryRunner } from "typeorm";

export class updateUser1657228075600 implements MigrationInterface {
    name = 'updateUser1657228075600'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "active" TO "email_verified"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "email_verified" TO "active"`);
    }

}
