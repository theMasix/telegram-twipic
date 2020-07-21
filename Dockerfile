FROM node:13-slim

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

RUN apt-get update
RUN apt-get clean
RUN rm -rf /var/lib/apt/lists/*


COPY package*.json ./

USER node

RUN npm install

COPY --chown=node:node . ./

EXPOSE 8080

CMD ["npm", "start" ]