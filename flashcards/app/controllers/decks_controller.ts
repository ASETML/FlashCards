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
  async getDecks({ session }: HttpContext) {
    const id = await session.get('id')
    console.log(id)
    const decks = await Deck.query().where('user_fk', '=', id)
    console.log(decks)
  }

  /**
   * Display form to create a new record
   */
  async create({ view }: HttpContext) {
    return view.render('pages/newDeck', { title: 'Nouveau Deck' })
  }

  /**
   * Handle form submission for the create action
   */
  async store({ auth, request, session, response }: HttpContext) {
    const { title, description, difficulty } = await request.validateUsing(createDeckValidator)
    let deck
    console.log(title)
    if (title) {
      deck = await Deck.query().where('title', '=', title)
      console.log(deck)
    }
    if (description.length < 10) {
      return response.redirect().toRoute('accueil')
    }
    if (deck.title) {
      return response.redirect().toRoute('accueil')
    }
    console.log(title, description, difficulty)
    const user_fk = await session.get('id')
    console.log(user_fk, title, description, difficulty)
    await Deck.create({ title, description, difficulty, user_fk })

    // Afficher un message à l'utilisateur
    session.flash('success', 'Le nouveau deck a été ajouté avec succès !')
    return response.redirect().toRoute('accueil')
  }

  /**
   * Show individual record
   */
  async show({ params, view }: HttpContext) {
    const deck = await Deck.query().where('deck_id', params.id).firstOrFail()
    return view.render('pages/showDeck', { deck })
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
  async destroy({ params, response }: HttpContext) {
    const deck = await Deck.findOrFail(params.id)

    await deck.delete()
    return response.redirect().toRoute('accueil')
  }
}
