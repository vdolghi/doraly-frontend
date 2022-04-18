FROM node:16

WORKDIR /vue_app

COPY package.json .

RUN npm i -g

COPY . .

EXPOSE 8080

CMD ["npm", "run", "serve"]