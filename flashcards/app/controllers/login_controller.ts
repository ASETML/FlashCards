import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { loginUserValidator } from '#validators/login'
import hash from '@adonisjs/core/services/hash'
import { dd } from '@adonisjs/core/services/dumper'

export default class LoginController {
  /**
   * Se connecter
   */
  async login({ request, auth, session, response }: HttpContext) {
    // Récupère les données validées
    const { username, password } = await request.validateUsing(loginUserValidator)
    console.log('1')

    //TEMP
    User.create(username, 'email', hash.make(password))

    // Récupère l'utilisateur correspondant aux données saisies par l'utilisateur
    //const user = await User.verifyCredentials(username, password)
    const user = await User.findBy('username', username)

    if (!user) {
      return response.abort('Invalid credentials')
    }

    /**
     * Verify the password using the hash service
     */
    const isPasswordValid = await hash.verify(user.password, password)

    if (!isPasswordValid) {
      return response.abort('Invalid credentials')
    }

    console.log('2')

    // Utilise le guard 'web' pour connecter l'utilisateur -> Voir le fichier config/auth.ts
    await auth.use('web').login(user)
    console.log('3')

    // Affiche un msg à l'utilsateur
    session.flash('success', "L'utilisateur s'est connecté avec succès")
    console.log('4')

    // Redirige vers la route ayant pour nom 'home'
    return response.redirect().toRoute('home')
  }

  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {}

  /**
   * Display form to create a new record
   */
  async create({}: HttpContext) {}

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {}

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {}

  /**
   * Edit individual record
   */
  async edit({ params }: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {}

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {}
}
