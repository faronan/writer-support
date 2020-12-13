FROM node:12.19.1

WORKDIR /usr/app
COPY ./package*.json ./
RUN npm ci

COPY . .
