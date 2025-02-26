/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import AuthController from '#controllers/auth_controller'
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

//Route qui permet de revenir à l'accueil
router.on('/').render('pages/home').as('home')

//Route qui permet de revenir au login
router.on('/login').render('pages/login').as('login')

//Connexion
router.post('/login', [AuthController, 'handleLogin']).as('auth.handleLogin')

//Inscription
router.on('/register').render('pages/register').as('register')
router.post('/register', [AuthController, 'register']).as('auth.register')
