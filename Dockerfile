FROM node:18-alpine

WORKDIR /app

COPY package.json tsconfig.json ecosystem.config.json ./

COPY ./src ./src

RUN ls -a

RUN npm install && npm run build
