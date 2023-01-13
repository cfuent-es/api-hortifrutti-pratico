import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'cities_stores'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.primary(['city_id', 'store_id'])

      table.integer('city_id').unsigned().notNullable().references('id').inTable('cities')
      table.integer('store_id').unsigned().notNullable().references('id').inTable('stores')
      table.decimal('delivery_fee', 10, 2).notNullable()

      table.timestamps(true, true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
