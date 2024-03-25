FROM node:20

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json .
RUN npm install --omit=dev

# Bundle app source
COPY server.js .
COPY index.html .

EXPOSE 3000
CMD [ "node", "server.js" ]
