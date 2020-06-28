FROM node:12.16.2 as build
WORKDIR /app
COPY . .

RUN npm install --silent
RUN npm run build


FROM node:alpine
WORKDIR /app

COPY --from=build /app/build /app/build
COPY package.json .

ENV NODE_ENV=production
RUN npm install


EXPOSE 3000

CMD ["node", "/app/build/start.js"]