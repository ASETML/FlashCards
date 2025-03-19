import vine from '@vinejs/vine'

const loginUserValidator = vine.compile(
  vine.object({
    username: vine.string(),
    password: vine.string().minLength(4),
  })
)

const registerUserValidator = vine.compile(
  vine.object({
    username: vine.string().unique(async (db, value) => {
      const user = await db.from('t_user').where('username', value).first()
      return !user
    }),

    password: vine.string().minLength(8),
    repeat: vine.string(),
  })
)

export { loginUserValidator, registerUserValidator }
