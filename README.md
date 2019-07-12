# Go Barber

## Requirements

Database postgres

Install with docker

```shell
docker run --name postgres -e POSTGRES_PASSWORD=docker -p 5432:5432 -d
postgres
docker run --name mongobarber -p 27017:27017 -d -t mongo
docker run --name mailhog -p 1025:1025 -p 8025:8025 -d mailhog/mailhog
```

## Migrations

```shell
yarn && yarn sequelize db:migrate
```

## Test

```shell
yarn dev
```
