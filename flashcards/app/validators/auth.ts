import vine from '@vinejs/vine'
import { emit } from 'process'

const loginUserValidator = vine.compile(
  vine.object({
    username: vine.string(),
    password: vine.string().minLength(4),
  })
)

const registerUserValidator = vine.compile(
  vine.object({
    username: vine.string(),
    password: vine.string().minLength(8),
    repeat: vine.string(),
  })
)

export { loginUserValidator, registerUserValidator }
