FROM node

# Create data directories
WORKDIR /usr/data/waiting
WORKDIR /usr/data/success
# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 3000
CMD ["npm", "start"]

# https://www.npmjs.com/package/express-generator
# https://www.npmjs.com/package/express-generator-typescript

#create : public/
#create : public/javascripts/
#create : public/images/
#create : public/stylesheets/
#create : public/stylesheets/style.css
#create : routes/
#create : routes/index.js
#create : routes/users.js
#create : views/
#create : views/error.jade
#create : views/index.jade
#create : views/layout.jade
#create : app.js
#create : package.json
#create : bin/
#create : bin/www

#install dependencies:
#    $ npm install

#run the app:
#    $ DEBUG=pipeline:* npm start

# https://flaviocopes.com/node-axios/
