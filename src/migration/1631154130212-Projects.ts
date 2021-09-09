import {MigrationInterface, QueryRunner} from "typeorm";

export class Projects1631154130212 implements MigrationInterface {
    name = 'Projects1631154130212'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_projects" ("project_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" character varying NOT NULL, "user_id" character varying NOT NULL, "businesses" text, "created_on" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_4c6aaf014ba0d66a74bb5522726" PRIMARY KEY ("project_id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user_projects"`);
    }

}
