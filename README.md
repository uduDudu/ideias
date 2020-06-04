# cpt-ideas-project

https://blog.logrocket.com/building-a-product-hunt-clone-app-using-hasura-and-next-js/

## Requirements

1. Install Docker
1. Install hasura cli: `npm install -g hasura-cli`

## Access backend for exec migrations
```bash
docker exec -it cpt-ideas-project_authentication_1 /bin/sh
npm install -g knex # revisit
knex migrate:latest
```

## Access hasura console
```bash
cd backend
hasura console
```

## Add new users
```bash
curl -H "Content-Type: application/json" \
     -d'{"username": "leo", "password": "pass", "confirmPassword": "pass"}'\
     http://localhost:32530/signup
```
