import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Deck from '#models/deck'
export default class AccueilsController {
  /**
   * Display a list of resource
   */
  public async accueil({ auth, session, response, view }: HttpContextContract) {
    // Vérifie la session
    const userId = auth.user.id
    console.log(userId)
    if (!userId) {
      return response.redirect('/login')
    }

    // Récupère les decks de l'utilisateur connecté
    const decks = await Deck.query().where('user_fk', userId).orderBy('title', 'asc')

    // Passe les decks à la vue
    return view.render('pages/home', { decks })
  }

  //Redirection
  public async home({ auth, session, response, view }: HttpContextContract) {
    return response.redirect().toRoute('accueil')
  }
  /**
   * Display form to create a new record
   */

  /**
   * Handle form submission for the create action
   */

  /**
   * Show individual record
   */

  /**
   * Edit individual record
   */

  /**
   * Handle form submission for the edit action
   */

  /**
   * Delete record
   */
}
