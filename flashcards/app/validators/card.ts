import vine from '@vinejs/vine'

const createCardValidator = vine.compile(
  vine.object({
    question: vine.string(),
    answer: vine.string(),
  })
)

export { createCardValidator }
