import type { HttpContext } from '@adonisjs/core/http'
import Card from '#models/card'
import Deck from '#models/deck'
import { createCardValidator } from '#validators/card'

export default class CardsController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {}

  /**
   * Display form to create a new record
   */
  async create({ params, view }: HttpContext) {
    const deck = await Deck.query().where('deck_id', params.id).firstOrFail()
    return view.render('pages/newCard', { title: 'Nouvelle carte', deck: deck })
  }

  /**
   * Handle form submission for the create action
   */
  async store({ params, request, response }: HttpContext) {
    const { question, answer } = await request.validateUsing(createCardValidator)
    const deck_fk = params.id
    await Card.create({ question, answer, deck_fk })
    return response.redirect().toRoute('showDeck', { id: deck_fk })
  }

  /**
   * Show individual record
   */
  async show({ params, view }: HttpContext) {
    return view.render('pages/newCard', { title: 'Nouvelle carte' })
  }

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
