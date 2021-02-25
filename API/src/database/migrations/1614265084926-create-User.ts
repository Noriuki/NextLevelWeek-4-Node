import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createUser1614265084926 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "User",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "email",
            type: "varchar",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("User");
  }
}
