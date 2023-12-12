FROM node:21-alpine3.19

COPY . /app

WORKDIR /app

RUN yarn && npm i -g serve && yarn build

EXPOSE 3000

CMD [ "serve", "-s", "build", "-l", "3000" ]
