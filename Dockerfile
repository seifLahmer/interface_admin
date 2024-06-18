# Utilisation de l'image Node.js comme base
FROM node:latest

# Définition du répertoire de travail dans le conteneur
WORKDIR /app

# Copie des fichiers nécessaires
COPY package.json .
COPY package-lock.json .

# Installation des dépendances
RUN npm install

# Copie du code source de l'application
COPY . .
EXPOSE 3000
# Commande à exécuter lors du démarrage du conteneur
CMD [ "npm", "start" ]
