FROM node:20.11.1-alpine3.19

# Création du répertoire de travail
WORKDIR /app

# Copie du code source
COPY . .

# Supprimmer node_modules et package-lock.json si ils ont étés copiés (normalement non)
RUN rm -rf ./node_modules
RUN rm -rf ./package-lock.json

# Installation des dépendances avec npm directement
RUN npm install

# Exposition du port
EXPOSE 3333