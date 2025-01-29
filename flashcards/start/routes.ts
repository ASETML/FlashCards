/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

//Route qui permet de revenir à l'accueil
router.on('/').render('pages/home').as('home')

//Route qui permet de revenir au login
router.on('/login').render('pages/login').as('login')
