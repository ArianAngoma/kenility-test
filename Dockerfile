FROM node:23-alpine3.19 AS deps

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

FROM node:23-alpine3.19 AS builder

WORKDIR /usr/src/app

COPY --from=deps /usr/src/app/node_modules ./node_modules

COPY . .

FROM node:23-alpine3.19 AS dev

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app ./
