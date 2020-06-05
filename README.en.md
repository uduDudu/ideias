# IPT: IdeiasPraTodos (Ideas for Everyone)

Let's share good coding, app ideas and exercises? So people who is learning can practice by creating, developing and collaborating with easy level exercises and ideas; whereas the more experienced ones can develop and partner up with others to build the advanced ones! ALWAYS PRACTICING!

## Requirements

1. Install Docker
1. Install node
1. Install yarn `npm install -g yarn`
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

Try to signup! If everything is working you should see a new user!

## Access Hasura Console

```bash
cd hasura
hasura console
```

Profit!
