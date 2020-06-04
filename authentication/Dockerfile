FROM node:12-alpine
WORKDIR /root/app
COPY package.json .

RUN npm install -g knex
RUN yarn install --only=production

COPY . .
EXPOSE 8080
CMD npm start
#TODO: https://learnk8s.io/blog/smaller-docker-images
