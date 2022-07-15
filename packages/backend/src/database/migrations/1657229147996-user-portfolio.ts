import { MigrationInterface, QueryRunner } from "typeorm";

export class userPortfolio1657229147996 implements MigrationInterface {
    name = 'userPortfolio1657229147996'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "portfolio" ADD "user_id" uuid`);
        await queryRunner.query(`ALTER TABLE "portfolio" ADD CONSTRAINT "FK_89055af4a272bb99a3d3ed2f247" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "portfolio" DROP CONSTRAINT "FK_89055af4a272bb99a3d3ed2f247"`);
        await queryRunner.query(`ALTER TABLE "portfolio" DROP COLUMN "user_id"`);
    }

}
