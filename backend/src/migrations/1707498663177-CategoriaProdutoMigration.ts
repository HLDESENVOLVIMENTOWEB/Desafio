import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialSchema0001163714163654 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "categoria" (
                "id" SERIAL NOT NULL,
                "nome" character varying NOT NULL,
                CONSTRAINT "PK_8a3b62c8f5e4f5b3e8505b84b1e" PRIMARY KEY ("id")
            )
        `);

        await queryRunner.query(`
            CREATE TABLE "produto" (
                "id" SERIAL NOT NULL,
                "nome" character varying NOT NULL,
                "descricao" text NOT NULL,
                "preco" numeric(10,2) NOT NULL,
                "categoriaId" integer,
                CONSTRAINT "PK_22cc43e9a74d7498546e9a63e7e" PRIMARY KEY ("id"),
                CONSTRAINT "FK_a3c9eaa89d4f1a7f7e39c9d4eee" FOREIGN KEY ("categoriaId") REFERENCES "categoria"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "produto"`);
        await queryRunner.query(`DROP TABLE "categoria"`);
    }
}
