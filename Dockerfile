FROM node:16-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY server.js server.js

CMD node server.js --bind 0.0.0.0:$PORT

# docker build . -t otus/k6
# docker run -p 8080:8080 otus/k6