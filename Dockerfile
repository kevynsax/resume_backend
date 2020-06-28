FROM node:12.16.2 as build
WORKDIR /app
COPY . .

RUN npm install --silent
RUN npm run build

FROM node:alpine
COPY --from=build /app/build /app
COPY --from=build /app/node_modules /app/
COPY --from=build /app/package.json /app/

EXPOSE 3000

CMD ["node", "/app/start.js"]