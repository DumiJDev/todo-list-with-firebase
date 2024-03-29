FROM node:21-alpine3.19

COPY . /app

WORKDIR /app

RUN npm i && npm i -g serve && yarn build

EXPOSE 3000

CMD [ "serve", "-s", "build", "-l", "3000" ]
