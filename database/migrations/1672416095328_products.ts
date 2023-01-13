import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "products";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary();

      table
        .integer("category_id")
        .notNullable()
        .unsigned()
        .references("id")
        .inTable("categories")
        .onDelete("RESTRICT");

      table.string("name").notNullable();
      table.string("image_url").nullable();
      table.string("description");
      table.decimal("price", 10, 2).notNullable();
      table.integer("position").notNullable();
      table.string("unit", 3).notNullable();
      table.boolean("active").notNullable().defaultTo(true);

      table.timestamp("deleted_at").nullable();
      table.timestamps(true, true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
