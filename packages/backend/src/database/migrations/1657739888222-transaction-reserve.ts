import { MigrationInterface, QueryRunner } from "typeorm";

export class transactionReserve1657739888222 implements MigrationInterface {
    name = 'transactionReserve1657739888222'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "reserve" ("tx" character varying NOT NULL, "block" integer NOT NULL, "timestamp" integer NOT NULL, "reserve0" character varying NOT NULL, "reserve1" character varying NOT NULL, "pair_pair" character varying, CONSTRAINT "PK_2ee4342c2ec933be5b04182d0df" PRIMARY KEY ("tx"))`);
        await queryRunner.query(`CREATE TABLE "transaction" ("tx" character varying NOT NULL, "address" character varying NOT NULL, "amount0_in" character varying NOT NULL, "amount1_in" character varying NOT NULL, "amount0_out" character varying NOT NULL, "amount1_out" character varying NOT NULL, "pair_pair" character varying, CONSTRAINT "PK_4976ab404ec61242f46a12a020a" PRIMARY KEY ("tx"))`);
        await queryRunner.query(`ALTER TABLE "reserve" ADD CONSTRAINT "FK_8b850ec55cad4b1222fe004571a" FOREIGN KEY ("pair_pair") REFERENCES "pair"("pair") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_058791e3c8a1b603b90810f9e11" FOREIGN KEY ("pair_pair") REFERENCES "pair"("pair") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_058791e3c8a1b603b90810f9e11"`);
        await queryRunner.query(`ALTER TABLE "reserve" DROP CONSTRAINT "FK_8b850ec55cad4b1222fe004571a"`);
        await queryRunner.query(`DROP TABLE "transaction"`);
        await queryRunner.query(`DROP TABLE "reserve"`);
    }

}
