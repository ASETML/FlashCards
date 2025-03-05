import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Deck from '#models/deck'
export default class AccueilsController {
  /**
   * Display a list of resource
   */

  public async accueil({ view, auth }: HttpContextContract) {
    const userId = auth.user.id
    console.log(userId)
    const decks = await Deck.query().where('user_fk', userId).orderBy('title', 'asc')

    return view.render('pages/home', { decks })
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
