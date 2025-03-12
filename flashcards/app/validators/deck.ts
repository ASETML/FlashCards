import vine from '@vinejs/vine'

const createDeckValidator = vine.compile(
  vine.object({
    title: vine.string(),
    description: vine.string(),
    difficulty: vine.number(),
  })
)

export { createDeckValidator }
