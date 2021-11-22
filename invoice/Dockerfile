FROM node:16.3-alpine

RUN mkdir -p /app
COPY . /app
WORKDIR /app

RUN npm install --no-audit --no-optional

CMD npm start
