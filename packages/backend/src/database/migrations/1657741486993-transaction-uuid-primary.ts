import { MigrationInterface, QueryRunner } from "typeorm";

export class transactionUuidPrimary1657741486993 implements MigrationInterface {
    name = 'transactionUuidPrimary1657741486993'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transaction" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "PK_4976ab404ec61242f46a12a020a"`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "PK_1eb917d9d52a41e801af7b6876d" PRIMARY KEY ("tx", "id")`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "PK_1eb917d9d52a41e801af7b6876d"`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9" PRIMARY KEY ("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9"`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "PK_1eb917d9d52a41e801af7b6876d" PRIMARY KEY ("tx", "id")`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "PK_1eb917d9d52a41e801af7b6876d"`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "PK_4976ab404ec61242f46a12a020a" PRIMARY KEY ("tx")`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP COLUMN "id"`);
    }

}
