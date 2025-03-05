import vine from '@vinejs/vine'

const createDeckValidator = vine.compile(
  vine.object({
    title: vine.string().unique(async (db, value, field) => {
      const deck = await db.from('t_deck').where('title', value).first()
      return !deck
    }),
    description: vine.string().minLength(10),
    difficulty: vine.number().min(1).max(5),
  })
)

export { createDeckValidator }
