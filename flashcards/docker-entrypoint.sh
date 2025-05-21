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