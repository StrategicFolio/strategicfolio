import { MigrationInterface, QueryRunner } from "typeorm";

export class removeTransactionRelation1657894123294 implements MigrationInterface {
    name = 'removeTransactionRelation1657894123294'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_785a2092c6293cd7060e3799dfc"`);
        await queryRunner.query(`ALTER TABLE "transaction" ALTER COLUMN "pair" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transaction" ALTER COLUMN "pair" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_785a2092c6293cd7060e3799dfc" FOREIGN KEY ("pair") REFERENCES "pair"("pair") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
