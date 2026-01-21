FROM node:20

WORKDIR /app

# Copy workspace manifests first (better caching)
COPY package*.json ./
COPY todo-backend/package*.json ./todo-backend/
COPY todo-frontend/package*.json ./todo-frontend/

RUN npm install

# Copy full source
COPY . .

# Build both apps
RUN npm run build

# App Engine will send traffic to PORT
EXPOSE 8080

CMD ["npm", "run", "start"]
