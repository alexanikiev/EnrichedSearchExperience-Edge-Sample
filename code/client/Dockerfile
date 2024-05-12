FROM node
RUN echo "fs.inotify.max_user_watches=524288" >> /etc/sysctl.conf
ENV NODE_ENV development
ENV CHOKIDAR_USEPOLLING false
# ENV REACT_APP_SERVERIP 10.137.132.105

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

RUN npm run build
RUN npm install -g http-server

EXPOSE 8080
#CMD ["npm", "start"]
WORKDIR ./build
CMD ["http-server", "-s"]

# https://create-react-app.dev/docs/adding-typescript/
# https://github.com/wmonk/create-react-app-typescript/blob/master/template/README.md#deployment
# https://github.com/facebook/create-react-app/issues/8688 (adding tty: true to the docker-compose file)