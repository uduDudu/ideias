# FROM mhart/alpine-node

# WORKDIR /app
# COPY . .

# RUN yarn install
# RUN yarn build

# EXPOSE 3000
# CMD ["yarn", "start"]


FROM mhart/alpine-node:11.1.0

RUN mkdir /frontend-app
WORKDIR /frontend-app
COPY . /frontend-app/

RUN apk update && apk upgrade && apk add --no-cache bash git

RUN yarn install

EXPOSE 3000
CMD ["yarn", "dev"]
