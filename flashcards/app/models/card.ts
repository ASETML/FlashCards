import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import { Deck } from '#model/deck'

export default class Card extends BaseModel {
  public static table = 't_card'
  @column({ isPrimary: true })
  declare card_id: number

  @column()
  declare question: String

  @column()
  declare answer: String

  @column()
  declare deck_fk: number // Colonne correspondant à la clé étrangère

  @belongsTo(() => Deck)
  public deck: ReturnType<typeof belongsTo> // Relation vers le modèle Deck

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
