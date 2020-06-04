# cpt-ideas-project

https://blog.logrocket.com/building-a-product-hunt-clone-app-using-hasura-and-next-js/

## Requirements

1. Install Docker
1. Install hasura cli: `npm install -g hasura-cli`

## Authentication Certificates

```bash
cd authentication
cp default.env .env
openssl genrsa -out private.pem 2048
openssl rsa -in private.pem -pubout > public.pem
awk -v ORS='\n' '1' public.pem
# Add the above output into the HASURA_GRAPHQL_JWT_SECRET key present in the
# .env file of our backend application. including the --- BEGIN and END ---

cd backend
cp default.env .env
# eg: HASURA_GRAPHQL_JWT_SECRET={"type": "RS256", "key": "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1ZXVd9hF9vKUPFiwrln/\nIlXrdRtUmI8P236djsdqb9DDLADl+l4k+nQocwYmEgDuzOjPYQ/atQ44lBdDEDPd\nYkvZ5MN2ARuvmvu95VDUBK6X5vmWUAEeppyA1CyNr4v97JivwEIojzrIOq/W9l0n\nqYyvGCVxLeA+AflEq1Gu8b+uDqxuofam1tp+NLZ3fal4/yE1evwRJWyBu2U9gEnt\nErtFGJ1Htty1J5v7IJenPB3RAT2mN1RRan+B7b2hfe2sFTs1bMsDoNCBJ6FqMfxb\ntyF71bPmxY54IkKZRcMTfMikkUkNE1X+gJT3PBrxDau8ZyNvGNvRTF5c0Anhio+z\nfwIDAQAB\n-----END PUBLIC KEY-----"}
```

## Access backend for exec migrations

```bash
docker-compose up -d
docker exec -it ideias_authentication_1 /bin/sh
knex migrate:latest
exit
```

## Access hasura console

```bash
cd backend
hasura console
# go to the data tab, add the tables user, user_role, role to track
```

## Testing Adding Users

```bash
curl -H "Content-Type: application/json" \
     -d'{"username": "leo", "password": "pass", "confirmPassword": "pass"}'\
     http://localhost:32530/signup
```

## Access Frontend

http://localhost:32500
