import type { HttpContext } from '@adonisjs/core/http'
import Deck from '#models/deck'
import { createDeckValidator } from '#validators/deck'

export default class DecksController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {}

  /**
   * Decks d'un utilisateur
   */
  async getDecks({}: HttpContext) {
    const decks = await Deck.query().where('user_fk', '=', '1')
    console.log(decks)
  }

  /**
   * Display form to create a new record
   */
  async create({ view }: HttpContext) {
    return view.render('pages/newDeck', { title: 'a' })
  }

  /**
   * Handle form submission for the create action
   */
  async store({ auth, request, session, response }: HttpContext) {
    const { title, description, difficulty } = await request.validateUsing(createDeckValidator)
    const user_fk = await session.get('id')
    console.log(title, description, difficulty)
    await Deck.create({ title, description, difficulty, user_fk })
    // Afficher un message à l'utilisateur
    session.flash('success', 'Le nouveau deck a été ajouté avec succès !')
    return response.redirect().toRoute('home')
  }

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
