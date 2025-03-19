import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import User from './user.js'
import Theme from './theme.js'

export default class Deck extends BaseModel {
  public static table = 't_deck'
  @column({ isPrimary: true })
  declare deck_id: number

  @column()
  declare title: string

  @column()
  declare description: string

  @column()
  declare difficulty: number

  //user_fk
  @column()
  declare user_fk: number // Colonne correspondant à la clé étrangère

  @belongsTo(() => User)
  //public user!: ReturnType<typeof belongsTo> // Relation vers le modèle User
  public user!: any // Relation vers le modèle User

  //theme_fk
  @column()
  declare theme_fk: number // Colonne correspondant à la clé étrangère

  @belongsTo(() => Theme)
  //public theme!: ReturnType<typeof belongsTo> // Relation vers le modèle Section
  public theme!: any // Relation vers le modèle Section

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
