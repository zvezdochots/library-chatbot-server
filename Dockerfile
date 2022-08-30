FROM node:lts-alpine AS deps

ENV NODE_ENV=production

WORKDIR /app

COPY ./package.json ./

RUN npm install\
        && npm install typescript -g

COPY . .

RUN npx tsc

EXPOSE 3000

CMD [ "node", "build/app.js" ]
