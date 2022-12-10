FROM node:16.15.1

# Create app dir
RUN mkdir /usr/src/app
WORKDIR /usr/src/app

# Install app dependency
COPY package*.json ./

RUN npm i

# bundle app source
COPY . .

# Build project
RUN npm run build

EXPOSE 3001

CMD ["npm", "run", "start:prod", "--host", "0.0.0.0", "--disable-host-check"]
