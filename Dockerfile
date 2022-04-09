FROM node:16

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install --production

# Bundle app source
COPY server.js .
COPY public/ public/

EXPOSE 3000
CMD [ "node", "server.js" ]
