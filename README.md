# Flashcards

![Un fond jaune, avec flashcards écrit en bleu foncé sur un rectangle vert](./flashcards/public/img/logo.png "Logo de Flashcards")

Projet de Alban Segalen pour P_Bulles 2

## Installation

### Logiciels requis

- NodeJs: v20.11.0
- npm: v10.2.4
- Docker Desktop: v4.10.0

### Procédure d'installation

- Cloner le repo [Flashcards](https://github.com/ASETML/Flashcards)

- Ouvrir un cmd à la racine du projet

  - Dans le dossier `flashcards` (`cd flashcards`)
  - Executer `npm install`
  - Puis `node ace generate:key`

- Dans le dossier `Docker_MySQL` (`cd ../Docker_MySQL`)

  - Executer `docker compose up -d`
  - Puis `docker exec -it Flashcards_db /bin/bash`
    - Si ça ne fonctionne pas :
      - Cliquez sur "OPEN IN TERMINAL"
        ![Image de docker desktop avec une flèche qui pointe sur l'icône du terminal](./doc/docker-alternative.png "Alternative au cmd")
  - Puis `mysql -u root -proot`
  - Puis `create database db_flashcards;`

- Dans le dossier `flashcards` (`cd ../flashcards`)

  - Ensuite `node ace migration:fresh`
  - Puis `npm run dev`

- Aller sur [localhost:3333](http://localhost:3333)

### DBeaver

- Téléchargez DBeaver [https://dbeaver.io/download/](https://dbeaver.io/download/)
- J'utilise la version Community 25.0.1
- Pour se connecter à une base de donnée :
  - Cliquer sur l'icone d'ajout d'une connection ![Image de DBeaver avec une flèche qui pointe sur l'icône d'ajout de connection](./doc/DBeaver1.png "Créer une connection")
  - Choisir le [SGBD](https://fr.wikipedia.org/wiki/Syst%C3%A8me_de_gestion_de_base_de_donn%C3%A9es), ici [MySql](https://www.mysql.com/), puis cliquez sur suivant ![Image de DBeaver avec MySql selectionné](./doc/DBeaver2.png "Choix du SGBD")
  - Remplir les informations de connection en fonction du `./flashcards/.env`, puis cliquez sur terminer ![Image de DBeaver sur l'écran des paramètres de connexion](./doc/DBeaver3.png "Paramètres de la connection")
  - Pour se connecter, il faut faire un clic droit sur la connexion, puis cliquer sur se connecter ![Image de DBeaver quand on a fait clic droit sur une connexion](./doc/DBeaver4.png "Se connecter")
- Si ça n'a pas fonctionné
  - Si l'erreur est : `Public Key Retrieval not Allowed`:
    - Clic Droit -> Editer connection
    - Dans l'onglet `Propriété du pilote`
      - Ajouter une propriété `allowPublicKeyRetrieval` avec une valeur de `TRUE` (cliquez sur l'icone +) [stackoverflow](https://stackoverflow.com/questions/61749304/connection-between-dbeaver-mysql) ![Image de DBeaver sur la page de propriété du pilote](./doc/DBeaver5.png "Public Key Retrieval not Allowed")
