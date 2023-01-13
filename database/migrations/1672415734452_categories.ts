import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "categories";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary();

      table
        .integer("store_id")
        .notNullable()
        .unsigned()
        .references("id")
        .inTable("stores")
        .onDelete("RESTRICT");

      table.string("name").notNullable();
      table.string("description");
      table.integer("position").notNullable();
      table.boolean("active").notNullable().defaultTo(true);

      table.timestamp("deleted_at").nullable();
      table.timestamps(true, true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
