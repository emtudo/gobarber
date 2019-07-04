# Node skeleton

## Requirements

Database postgres

Install with docker

```shell
docker run --name postgres -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
```

## Migrations

```shell
yarn && yarn sequelize db:migrate
```

## Test

```shell
yarn dev
```
