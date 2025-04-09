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
  async store({ params, request, response, view, session }: HttpContext) {
    const { question, answer } = await request.validateUsing(createCardValidator)
    const deck_fk = params.id
    if (!question || question.length < 10) {
      const deck = await Deck.query().where('deck_id', params.id).firstOrFail()
      return view.render('pages/newCard', {
        title: 'Nouvelle carte',
        deck: deck,
        error: 'La question doit être au moins de 10 caractères',
      })
    }

    if (!answer) {
      const deck = await Deck.query().where('deck_id', params.id).firstOrFail()
      return view.render('pages/newCard', {
        title: 'Nouvelle carte',
        deck: deck,
        error: 'La réponse ne doit pas être vide',
      })
    }
    const card = await Card.query().where('question', '=', question).first()
    console.log(card, question, answer)

    if (card && card.question) {
      const deck = await Deck.query().where('deck_id', params.id).firstOrFail()
      return view.render('pages/newCard', {
        title: 'Nouvelle carte',
        deck,
        questionError: 'Cette question existe déjà dans ce deck',
      })
    }
    await Card.create({ question, answer, deck_fk })
    session.flash({ sucess: 'La carte à bien été crée' })
    return response.redirect().toRoute('showDeck', { id: deck_fk })
  }

  /**
   * Show individual record
   */
  async show({ params, view }: HttpContext) {
    const card = await Card.query().where('card_id', params.cid).firstOrFail()
    return view.render('pages/showCard', { card: card })
  }

  /**
   * Edit individual record
   */
  async edit({ params, view }: HttpContext) {
    const card = await Card.findOrFail(params.id)
    return view.render('pages/editCard', { card })
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response, session }: HttpContext) {
    const card = await Card.findOrFail(params.id)
    const { question, answer } = await request.validateUsing(createCardValidator)
    console.log(question, answer, card)

    if (question && answer) {
      if (card) {
        await card.merge({ question, answer }).save()
      }
      session.flash({ sucess: 'La carte à bien été modifiée' })
      return response.redirect().toRoute('showDeck', { id: card.deck_fk })
    }
  }

  /**
   * Delete record
   */
  async destroy({ params, response, session }: HttpContext) {
    const card = await Card.findOrFail(params.id)
    const deck_fk: any = card.deck_fk

    await card.delete()

    session.flash({ sucess: 'La carte à bien été supprimée' })
    return response.redirect().toRoute('showDeck', { id: deck_fk })
  }
}
