# API Social Media App (Instagram Clone)

API for social media app
API Documentation: https://documenter.getpostman.com/view/11078261/2s7YfGGJEP
Source code frontend: https://github.com/zidnirifan/socmed-app-frontend

## Technologies

- Typescript - https://www.typescriptlang.org
- Node.js - https://nodejs.org
- Express.js - https://expressjs.com/
- MongoDB - https://www.mongodb.com/
- Mongoose - https://mongoosejs.com/
- Firebase Storage - https://firebase.google.com/
- Socket.IO - https://socket.io/

## Quick Start

Clone project and install dependencies:

```bash
$ git clone https://github.com/zidnirifan/socmed-app-backend.git
$ cd socmed-app-backend
$ npm install
```

Rename file **.env.example** and replace the values with the appropriate values

Compile code:

```bash
$ npm run tsc
```

Start development server with nodemon:

```bash
$ npm run start-dev
```

Start production server:

```bash
$ npm run start
```

Run test

```bash
$ npm run test
```

Run test coverage

```bash
$ npm run test:watch
```

## Project structure

```
.socmed-app-backend/  →  Root  Project
├─ src/  →  Source code
│  ├─  Applications/  →  Application  Business  Rules
│  │  ├─ security/  →  Abstract/interface of tools and helpers in terms of security used in the use case
│  │  ├─ use_cases/  →  Application business flow
│  ├─  Commons/  →  Shared folder
│  │  ├─ exceptions/  →  Custom exceptions
│  ├─  Domains/  →  Enterprise  Business  Rules
│  │  ├─ users/  →  Subdomain users, here contains the model domain (entities) and the UserRepository abstraction/interface
│  ├─  Infrastructures/  →  Frameworks and drivers
│  │  ├─ database/  →  Driver database
│  │  ├─ http/  → HTTP Server
│  │  ├─ repositories/  →  Concrete object/implementation of repository domain
│  │  ├─ security/  →  Concrete object/implementation of tools and helpers in terms of security
│  │  ├─ container.js →  Container all instances of the service usedaplikasi
│  ├─  Interfaces/  →  Interface  Adapter.  Here contains routes and handlers
│  ├─ index.ts →  Entry point app
│  ├─ tests/  →  Functional test and test helpers
├─  .env →  Environment variable
├─  package.json →  Project  Manifest
```
