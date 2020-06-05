# IPT: IdeiasPraTodos (Ideas for Everyone)

Vamos compartilhar boas ideias de código, apps e exercícios? Assim as pessoas que estão aprendendo podem praticar criando, desenvolvendo e colaborando com exercicios e ideias mais fáceis; os mais experientes podem se juntar à outros para desenvolver ideias mais complexas! SEMPRE PRATICANDO!

## Requisitos

1. Install Docker
1. Install node
1. Install yarn `npm install -g yarn`
1. Install hasura cli: `npm install -g hasura-cli`

## Executar Aplicação

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

## Acesso ao Frontend

http://localhost:3000

Try to signup! If everything is working you should see a new user!

## Accesso ao Console do Hasura

```bash
cd hasura
hasura console
```

# Iniciativa de Código Livre da Comunidade CPT

CodigoPraTodos.com é uma comunidade para o aprendizado e troca de experiências de programação para todos os níveis! A ideia é 100% Gratuita e tem o objetivo de ensinar programação na Prática! Temos um curso de Introdução a Web pra quem nunca viu nada e também projetos-desafios para botar em prática a sua tecnologia favorita. Aprenda com projetos reais, participando e colaborando com nossas iniciativas open source também, assim como este projeto!
