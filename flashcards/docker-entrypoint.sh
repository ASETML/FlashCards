#!/bin/sh
set -e

# Attendre que MySQL soit prêt
echo "Attente du démarrage de MySQL..."
sleep 10
until [ "`docker inspect -f {{.State.Running}} db_adonis`"=="true" ]; do
    sleep 0.1;
done;

# Exécuter les migrations
echo "Exécution des migrations..."
node ace migration:run --force

# Exécuter les seeds
echo "Exécution des seeds..."
node ace db:seed

# Démarrer l'application
echo "Démarrage de l'application..."
npm run dev