import type { HttpContext } from '@adonisjs/core/http'
import DecksController from './decks_controller.js'
export default class AccueilsController {
  /**
   * Display a list of resource
   */
  public async accueil({ auth, response, view }: HttpContext) {
    // Vérifie la session
    if (!auth.user || !auth.user.id) {
      return response.redirect('/login')
    }

    const userId = auth.user.id

    // Récupère les decks de l'utilisateur connecté
    const controller = new DecksController()
    const decks = await controller.getDecks(userId)
    //const decks = await Deck.query().where('user_fk', userId).orderBy('title', 'asc')

    // Passe les decks à la vue
    return view.render('pages/home', { decks })
  }

  //Redirection
  public async home({ response }: HttpContext) {
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
