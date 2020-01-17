FROM node:10
# Create app directory
WORKDIR /NetGuru
# Install app dependencies
COPY package.json package.json
RUN npm install -g nodemon
# Copy app source code
COPY . .
#Expose port and start application
EXPOSE 5006
CMD [ "npm", "start" ]




