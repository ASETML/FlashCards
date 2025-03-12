/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import AuthController from '#controllers/auth_controller'
import DecksController from '#controllers/decks_controller'
import AccueilsController from '#controllers/accueils_controller'
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

router.get('/accueil', [AccueilsController, 'accueil']).as('accueil').use(middleware.auth())
router.get('/home', [AccueilsController, 'home']).as('home').use(middleware.auth())

//Route qui permet de revenir à l'accueil
router.get('/', [AccueilsController, 'accueil']).as('homeDeco').use(middleware.auth())

//Route qui permet de revenir au login
router.on('/login').render('pages/login').as('login')

//Connexion
router.post('/login', [AuthController, 'handleLogin']).as('auth.handleLogin')

//Inscription
router.on('/register').render('pages/register').as('register')
router.post('/register', [AuthController, 'register']).as('auth.register')

//Decks
router.get('/decks', [DecksController, 'getDecks']).as('getDecks').use(middleware.auth())
router.get('/decks/new', [DecksController, 'create']).as('newDeck').use(middleware.auth())
router.post('/decks/create', [DecksController, 'store']).as('createDecks').use(middleware.auth())
router.get('/showdeck/:id', [DecksController, 'show']).as('showDeck').use(middleware.auth())
router.get('/delDeck/:id', [DecksController, 'destroy']).as('delDeck').use(middleware.auth())
