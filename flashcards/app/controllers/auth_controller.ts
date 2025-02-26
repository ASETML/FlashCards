import type { HttpContext } from '@adonisjs/core/http'
import { loginUserValidator, registerUserValidator } from '#validators/auth'
import User from '#models/user'
import { request } from 'http'
import { error } from 'console'

/**
 * Controller pour l'authentification
 */
export default class AuthController {
  /**
   * Gérer la connexion d'un utilisateur
   */
  async handleLogin({ request, auth, session, response, view }: HttpContext) {
    // Récupère les données validées
    const { username, password } = await request.validateUsing(loginUserValidator)

    // Récupère l'utilisateur correspondant aux données saisies par l'utilisateur
    const user = await User.verifyCredentials(username, password)

    // Utilise le guard 'web' pour connecter l'utilisateur -> Voir le fichier config/auth.ts
    await auth.use('web').login(user)

    // Affiche un msg à l'utilsateur
    session.flash('success', "L'utilisateur s'est connecté avec succès")

    // Redirige vers la route ayant pour nom 'home'
    //return response.redirect().toRoute('home')
    return view.render('pages/home', { username: username })
  }

  /**
   * Gérer la déconnexion d'un utilisateur
   */
  async handleLogout({ auth, session, response }: HttpContext) {
    // Utilise le Guard 'web' pour déconnecter l'utilisateur -> Voir le fichier config/auth.ts
    await auth.use('web').logout()

    // Affiche un message à l'utilisateur
    session.flash('success', "L'utilisateur s'est déconnecté avec succès")

    // Redirige la réponse sur la route 'home'
    return response.redirect().toRoute('home')
  }

  /**
   * Inscription
   */
  async register({ request, response, view, session }: HttpContext) {
    const data = request.only(['username', 'password', 'repeat'])
    let payload
    try {
      payload = await registerUserValidator.validate(data)
    } catch (er) {
      console.log(er)
      return view.render('pages/register', { error: 'Ce nom est déjà pris' })
    }
    const user = await User.create({ username: payload.username, password: payload.password })

    //return response.redirect().toRoute('home')
    return view.render('pages/home', { username: payload.username })
  }
}
