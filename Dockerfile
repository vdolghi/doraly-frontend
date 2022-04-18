FROM node:16

WORKDIR /home/vueapp

COPY package.json .

RUN npm i -g

COPY . .

EXPOSE 8080

CMD ["npm", "run", "serve"]