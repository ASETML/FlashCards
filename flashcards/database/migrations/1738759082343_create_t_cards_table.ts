import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 't_card'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('card_id')
      table.string('question').notNullable()
      table.string('answer').notNullable()

      //FK
      table.integer('deck_fk').unsigned().references('deck_id').inTable('t_deck')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
