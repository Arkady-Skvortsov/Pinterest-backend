<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>

## Description

**Backend clone of the Pinterest application**

<div>
<img src="./src/assets/pinterest_logo.png" />
</div>

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

## Makefile (Docker) commands

```bash
  # Pin image && container
  pin-build

  pin-rmi

  up-pin-container

  down-pin-container

  inspect-pin-container

  # Postgres image && container
  pg-build

  up-pg-container

  down-pg-container

  inspect-pg-container

  # Redis image && container
  redis-build

  up-pg-container

  down-pg-container

  inspect-pg-container

  up-redis-container

  down-redis-container

  inspect-redis-container

  # docker-compose up
  make compose-up

  # docker-compose down
  make compose-down

  make compose-start-life # docker build -t image . + docker-compose up

  make compose-end-life # docker-compose down + docker-compose stop + docker rmi image

  # Unit tests
  make unit-tests

  # E2E tests
  make e2e-tests
```

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
