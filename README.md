# Flashcards

![Un fond jaune, avec flashcards écrit en bleu foncé sur un rectangle vert](./flashcards/public/img/logo.png "Logo de Flashcards")

Projet de Alban Segalen pour P_Bulles 2

# Table des matières

- [Installation](#installation)
  - [Logiciels requis](#logiciels-requis)
  - [Procédure d'installation](#proc%C3%A9dure-dinstallation)
- [DBeaver](#dbeaver)

# Environnements

![Un fond jaune, avec flashcards écrit en bleu foncé sur un rectangle vert](./doc/schemas.drawio.png "Logo de Flashcards")

## Développement

L'environnement utilisé pour le développement de l'application

### Installation

Voici comment mettre en place l'environnement de développement. Tous d'abord, voici la liste des logiciels requis.

| Logiciel                                                          | Version conseillée |
| ----------------------------------------------------------------- | ------------------ |
| [NodeJs](https://nodejs.org)                                      | v22.14.0           |
| [npm](https://www.npmjs.com/) (Inclus avec NodeJs)                | v10.9.2            |
| [Docker Desktop](https://www.docker.com/products/docker-desktop/) | v4.10.0            |

> Il s'agit des versions _minimum_, les versions plus récentes devraient aussi fonctionner.

#### Etape 1

Il faut d'abord cloner le repo [Flashcards](https://github.com/ASETML/Flashcards):

- en ligne de commande:

```sh
git clone https://github.com/ASETML/Flashcards
```

- avec [GitHub Desktop](https://github.com/apps/desktop)

#### Etape 2

Il maintenant démarrer la base de données. Pour cela, il faut ouvrir un invite de commande à la racine du repo.

- Aller dans le dossier qui contient le docker de la base de données :

```sh
cd Docker_Postgres
```

- Démarrer le conteneur :

```sh
docker-compose up -d
```

- Accéder au conteneur:

```sh
docker exec -it Flashcards_db /bin/bash
```

> Ne fonctionne pas dans un git bash

- Puis, dans l'invite de commande du conteneur:

```sh
su postgres
createdb db_flashcards
```

La base de données est maintenant créée et démarrée

#### Etape 3

Il faut installer les dépendances.

- Naviguer dans le repertoire de l'application

```sh
cd ../flashcards
```

- Installer les dépendances avec npm

```sh
npm install
```

### Etape 4

Il vous faut compléter les secrets de l'application.

Toujours dans le dossier `flashcards`

- Renommer le `.env.example` en `.env`

```sh
mv .env.example .env
```

- Vous aurez peut-être besoin d'adapter les informations du .env. Pour cela, il vous suffit d'éditer le fichier avec votre éditeur de texte préferé

- Il faut ensuite générer APP_KEY:

```sh
node ace generate:key
```

Les secrets de l'application sont maintenant renseigné.

#### Etape 5

Il faut exécuter les migrations pour créer les tables dans la base de données.

Toujours dans le dossier `flashcards`

- Exécuter les migrations

```sh
node ace migration:fresh
```

L'application est maintenant démarrée

## Staging

Il est prévu de mettre en place un environnement de test pour tester l'application avant de la mettre en production.

## Production

L'environnement de production. https://flashcards-itg2.onrender.com/

### Installation

## Logiciels requis

- NodeJs: v20.11.0
- npm: v10.2.4
- Docker Desktop: v4.10.0

## Procédure d'installation

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

# DBeaver

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
