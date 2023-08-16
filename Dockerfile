#Build node image from Node Docker Hub
FROM node:lts-alpine

# Switch Node environment. Default to production
ENV NODE_ENV=production

#Identify working directory
WORKDIR /usr/src/app

#Copy package
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]

#Install npm packages from package.json (DEPENDENCIES)
RUN npm install --production --silent && mv node_modules ../

#Copy app from source directory to container directory
COPY . .

#Expose server at port
EXPOSE 8080

RUN chown -R node /usr/src/app

USER node

#Start app 
CMD ["node", "index.js"]