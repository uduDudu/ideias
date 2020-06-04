# IPT: IdeiasPraTodos

## Requirements

1. Install Docker
1. Install hasura cli: `npm install -g hasura-cli`

## Run application

```bash
cp hasura/default.env hasura/.env
docker-compose up -d

cd auth-service
cp default.env .env
yarn
yarn dev

# go to a new terminal
cd frontend
yarn
yarn dev
```

## Access Frontend

http://localhost:3000

## Access Hasura Console

```bash
cd hasura
hasura console
```
