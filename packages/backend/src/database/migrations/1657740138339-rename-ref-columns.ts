import { MigrationInterface, QueryRunner } from "typeorm";

export class renameRefColumns1657740138339 implements MigrationInterface {
    name = 'renameRefColumns1657740138339'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_058791e3c8a1b603b90810f9e11"`);
        await queryRunner.query(`ALTER TABLE "reserve" DROP CONSTRAINT "FK_8b850ec55cad4b1222fe004571a"`);
        await queryRunner.query(`ALTER TABLE "transaction" RENAME COLUMN "pair_pair" TO "pair"`);
        await queryRunner.query(`ALTER TABLE "reserve" RENAME COLUMN "pair_pair" TO "pair"`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_785a2092c6293cd7060e3799dfc" FOREIGN KEY ("pair") REFERENCES "pair"("pair") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reserve" ADD CONSTRAINT "FK_ff81ba4ec13df0f351524c5aa56" FOREIGN KEY ("pair") REFERENCES "pair"("pair") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reserve" DROP CONSTRAINT "FK_ff81ba4ec13df0f351524c5aa56"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_785a2092c6293cd7060e3799dfc"`);
        await queryRunner.query(`ALTER TABLE "reserve" RENAME COLUMN "pair" TO "pair_pair"`);
        await queryRunner.query(`ALTER TABLE "transaction" RENAME COLUMN "pair" TO "pair_pair"`);
        await queryRunner.query(`ALTER TABLE "reserve" ADD CONSTRAINT "FK_8b850ec55cad4b1222fe004571a" FOREIGN KEY ("pair_pair") REFERENCES "pair"("pair") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_058791e3c8a1b603b90810f9e11" FOREIGN KEY ("pair_pair") REFERENCES "pair"("pair") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
