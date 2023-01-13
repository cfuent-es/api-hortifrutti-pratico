import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'stores'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary();

      table.integer('user_id')
              .unsigned()
              .notNullable()
              .references("id")
              .inTable('users')
              .onDelete("CASCADE");

      table.string("name", 255).notNullable();
      table.string("logo", 255).nullable();
      table.boolean("active").notNullable().defaultTo(true);
      table.boolean("online").notNullable().defaultTo(false);

      table.timestamps(true, true);
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
