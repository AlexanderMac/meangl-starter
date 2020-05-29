# meangl-starter
`MEAN GraphQL` project template.
- Check [angular-starter](https://github.com/AlexanderMac/angular-starter) if you need Angular starter.
- Check [express-starter](https://github.com/AlexanderMac/express-starter) if you need Express starter.

[![Build Status](https://travis-ci.org/AlexanderMac/meangl-starter.svg?branch=master)](https://travis-ci.org/AlexanderMac/meangl-starter)
[![Code Coverage](https://codecov.io/gh/AlexanderMac/meangl-starter/branch/master/graph/badge.svg)](https://codecov.io/gh/AlexanderMac/meangl-starter)

### Features
- Client:
  - TypeScript
  - Users CRUD
  - Clean code:)
- Server:
  - Advanced project structure
  - RESTful User CRUD API.
  - Parameters validation.
  - Promises everywhere.
  - Configuration per environment.
  - Functional and unit tests.
  - Clean code:)

### Set
- Client:
  - **Framework**: Angular v8
  - **Language**: TypeScript v2
  - **Build tool**: Webpack v4
  - **CSS preprocessor**: stylus
  - **CSS framework**: boostrap v4
  - **Template engine**: pug
  - **Linters**: eslint, pug-lint
- Server:
  - **Backend**: express
  - **View engine**: pug
  - **Database**: mongodb
  - **Promises**: bluebird
  - **Linter**: eslint
  - **Testing**: mocha, should, supertest, sinon
  - **Logger**: winston, morgan
  - **Configuration**: n-conf
  - **Custom errors**: n-custom-errors

### How to use
```sh
# Clone this repo:
$ git clone https://github.com/AlexanderMac/meangl-starter.git

# Init your repo:
$ cd meangl-starter && rm -rf .git && git init

# Install dependencies:
$ npm i

# Configure database:
# Open `./server/config/environment/development.json` and change `db` key to your own database connection string.

# Start app:
$ npm start
```

### Commands

```sh
# Install all dependencies
$ npm i

# Update all dependencies
$ npm run update-all

# Show all outdated dependencies
$ npm run outdated-all

# Build frontend:
$ npm run build            # build development version
$ npm run build:production # build production version

# Run all tests:
$ npm test

# Run code coverage tool:
$ npm run coverage

# Run linter tool:
$ npm run lint

# Start server, build client, and watch for server and client changes:
$ npm start
```

### Service structure
- [client]
  - [config] - webpack configuration files
  - [src] - source files
- [server]
  - [config] - server configuration options
  - [src] - source files
  - [test] - unit and functional tests

### Author
Alexander Mac

### License
[MIT License](license)
