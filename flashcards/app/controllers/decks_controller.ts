import type { HttpContext } from '@adonisjs/core/http'
import Deck from '#models/deck'
import Card from '#models/card'
import { createDeckValidator } from '#validators/deck'

export default class DecksController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {}

  /**
   * Decks d'un utilisateur
   */
  public async getDecks(id: number) {
    const decks: Deck[] = await Deck.query().where('user_fk', '=', id)
    return decks
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
  async store({ request, session, response }: HttpContext) {
    const { title, description, difficulty } = await request.validateUsing(createDeckValidator)
    let deck
    console.log(title)
    if (title) {
      deck = await Deck.query().where('title', '=', title).first()
      console.log(deck + 'TS ERROR')
    }
    if (description.length < 10) {
      return response.redirect().toRoute('accueil')
    }
    if (deck && deck.title) {
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
    const cards: Card[] = await Card.query().where('deck_fk', '=', params.id)

    return view.render('pages/showDeck', { deck, cards })
  }

  /**
   * Edit individual record
   */
  async edit({ params, view }: HttpContext) {
    const deck = await Deck.findOrFail(params.id)
    return view.render('pages/editDeck', { deck })
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    const deck = await Deck.findOrFail(params.id)
    const { title, description, difficulty } = await request.validateUsing(createDeckValidator)

    if (deck) {
      await deck.merge({ title, description, difficulty }).save()
    }

    return response.redirect().toRoute('accueil')
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const deck = await Deck.findOrFail(params.id)

    await deck.delete()
    return response.redirect().toRoute('accueil')
  }
}
