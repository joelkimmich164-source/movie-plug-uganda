FROM node:20-alpine
WORKDIR /app
COPY package.json ./
RUN npm install --omit=dev
COPY movie-plug-admin-server.js ./
EXPOSE 3000
CMD ["npm","start"]
