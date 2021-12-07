FROM node:16 AS builder

WORKDIR /app

COPY package*.json ./
ENV PORT=8080

RUN npm install

COPY ./ ./

RUN npm run build

CMD ["npm", "run", "start"]
