import vine from '@vinejs/vine'

const createCardValidator = vine.compile(
  vine.object({
    question: vine.string().nullable(),
    answer: vine.string().nullable(),
  })
)

export { createCardValidator }
