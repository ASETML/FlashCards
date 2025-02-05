import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 't_deck'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('deck_id').notNullable()
      table.string('title').notNullable()
      table.string('description').nullable()
      table.integer('integer').notNullable()

      //FK
      table.integer('user_fk').unsigned().references('user_id').inTable('t_user')
      table.integer('theme_fk').unsigned().references('theme_id').inTable('t_theme')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
