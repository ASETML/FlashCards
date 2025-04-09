# Mise en place de l'application sur le serveur de test de l'ETML

- Dans un git bash :
  - `ssh -p 222 alban-w3@cmid2b-alban.w3.pm2etml.ch`
  - Pour visiter le site https://cmid2b-alban.w3.pm2etml.ch/
  - Pour se connecter à la DB
  - `mysql -u nom -pmdp`
- Info de connection dans la conversation avec XCL

- Git clone
- Auth par pwd plus supportées : cmid2b-alban-w3@w3:~$ git clone https://github.com/ASETML/FlashCards.git

  ```
  Cloning into 'FlashCards'...
  Username for 'https://github.com': ASETML
  Password for 'https://ASETML@github.com':
  remote: Support for password authentication was removed on August 13, 2021.
  remote: Please see https://docs.github.com/get-started/getting-started-with-git/about-remote-repositories#cloning-with-https-urls for information on currently recommended modes of authentication.
  fatal: Authentication failed for 'https://github.com/ASETML/FlashCards.git/'
  ```

- PAT : générer un PAT et l'utiliser comme mdp
- cd FlashCards/flashcards
- npm i
- npm audit fix
- npm audit fix --force //ça casse !!!! //peux être pas ça l'erreur //Pas ça l'erreur
  - Si on a fait : git restore .
- npm run dev
- Error: Cannot find module './swc.linux-x64-gnu.node'
- Solution : rm package-lock.json
  - rm -r node_modules/
- npm audit fix --force
- mv .env.example .env //Renommer
- node ace generate:key

Compléter .env

- Changer host : cmid2b-alban.w3.pm2etml.ch
- Changer db_port : 3306
- Changer db_user :
- Changer db_pwd
- Changer db_db

node ace migration:run

WebSocket server error: Port 24678 is already in use

Error: listen EADDRNOTAVAIL: address not available 62.2.127.4:3333 //Arrive car host est cmid2b-alban.w3.pm2etml.ch

nano .env -> Changer le port (9879) -> pas ça

npm run build
cd build
npm ci --omit="dev"
node bin/server.js

npm i pm2 -g

tjs la même erreur:
TypeError: Cannot read properties of undefined (reading 'join')
at file:///home/cmid2b-alban-w3/FlashCards/flashcards/build/node_modules/vite/dist/node/chunks/dep-Pj_jxEzN.js:17544:13
at async file:///home/cmid2b-alban-w3/FlashCards/flashcards/build/node_modules/vite/dist/node/chunks/dep-Pj_jxEzN.js:52265:28

Error: listen EADDRNOTAVAIL: address not available 62.2.127.4:3333

pm2 start 'node ace serve'

crontab -e

PATH=$PATH:/home/cmid2b-alban-w3/.nvm/versions/node/v22.12.0/bin
@reboot /home/cmid2b-alban-w3/.nvm/versions/node/v22.12.0/lib/node_modules/pm2/bin/pm2 resurrect

- Planter : $ ssh -p 222 cmid2b-alban-w3@cmid2b-alban.w3.pm2etml.ch
  kex_exchange_identification: Connection closed by remote host
  Connection closed by 62.2.127.4 port 222
- Solution: nouveau mdp
