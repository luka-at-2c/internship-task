FROM node:20-alpine

WORKDIR /frontend

COPY deploy/frontend/package*.json ./
COPY deploy/frontend/yarn.lock ./

ENV NODE_ENV=development

RUN yarn install

COPY deploy/frontend/ ./

EXPOSE 3000

CMD [ "yarn", "dev" ]