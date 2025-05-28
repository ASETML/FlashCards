#!/bin/sh
set -e

# Attendre que MySQL soit prêt
echo "Attente du démarrage de PostGres..."
sleep 6

# Exécuter les migrations
echo "Exécution des migrations..."
node ace migration:run --force

# Exécuter les seeds
echo "Exécution des seeds..."
node ace db:seed

# Construire l'application
echo "Construction de l'application..."
npm run build

# Copie des fichiers css et js
echo "Copie des ressources"
mkdir ./build/resources/css
cp ./resources/css/app.css ./build/resources/css/app.css
mkdir ./build/resources/js
cp ./resources/js/app.js ./build/resources/js/app.js

cd build

# Installation des dépendances
echo "Installation des dépendances"
npm ci --omit='dev'

# Démarrer l'application
echo "Démarrage de l'application"
node bin/server.js