# Synth Academy Backend

Synth Academy's backend orchestrates a symphony of learning, where every note finds its place. It expertly manages courses, tracks progress, and delivers content, ensuring a harmonious experience for every student. From enrollment to graduation, this unseen conductor guides the learning journey with precision and passion.

## Table of Contents

- [Synth Academy Backend](#synth-academy-backend)
  - [Table of Contents](#table-of-contents)
  - [Quick Start](#quick-start)
  - [Commands](#commands)
  - [Making Changes](#making-changes)
  - [Environment Variables](#environment-variables)
  - [Project Structure](#project-structure)
  - [API Documentation](#api-documentation)
    - [API Endpoints](#api-endpoints)
  - [Contributing](#contributing)
  - [License](#license)

## Quick Start

Clone the repo:

```bash
git clone https://github.com/abdullahmia/syntch-academy-server.git
```

Install the dependencies:

```bash
pnpm install
```

Set the environment variables:

```bash
cp .env.example .env

# open .env and modify the environment variables (if needed)
```

## Commands

Running locally:

```bash
pnpm dev
```

Running in production:

```bash
pnpm start
```

Compiling to JS from TS

```bash
pnpm build
```

Linting:

```bash
# run ESLint
pnpm lint

# fix ESLint errors
pnpm lint:fix

# run prettier
pnpm prettier

# fix prettier errors
pnpm prettier:fix
```

## Making Changes

Run `pnpm dev` so you can compile Typescript(.ts) files in watch mode

```bash
pnpm dev
```

Add your changes to TypeScript(.ts) files which are in the src folder. The files will be automatically compiled to JS if you are in watch mode.

## Environment Variables

The environment variables can be found and modified in the `.env` file. They come with these default values:

```bash
# Port number
PORT=3000

# URL of the Mongo DB
MONGODB_URL=mongodb://127.0.0.1:27017/Park254_Backend

# JWT
# JWT secret key
JWT_SECRET=thisisasamplesecret
# Number of minutes after which an access token expires
JWT_ACCESS_EXPIRATION_MINUTES=30
# Number of days after which a refresh token expires
JWT_REFRESH_EXPIRATION_DAYS=30

# SMTP configuration options for the email service
# For testing, you can use a fake SMTP service like Ethereal: https://ethereal.email/create
SMTP_HOST=email-server
SMTP_PORT=587
SMTP_USERNAME=email-server-username
SMTP_PASSWORD=email-server-password
EMAIL_FROM=support@yourapp.com

# URL of client application
CLIENT_URL=http://localhost:5000
```

## Project Structure

```
.
├── src                             # Source files
│   ├── app.ts                        # Express App
│   ├── config                        # Environment variables and other configurations
│   ├── custom.d.ts                   # File for extending types from node modules
│   ├── declaration.d.ts              # File for declaring modules without types
│   ├── index.ts                      # App entry file
│   ├── modules                       # Modules such as models, controllers, services
│   └── routes                        # Routes
├── TODO.md                         # TODO List
├── package.json
└── README.md
```

## API Documentation

To view the list of available APIs and their specifications, run the server and go to `http://localhost:3000/v1/docs` in your browser. This documentation page is automatically generated using the [swagger](https://swagger.io/) definitions written as comments in the route files.

### API Endpoints

List of available routes:

**Auth routes**:\
`POST /api/v1/auth/register` - register\
`POST /api/v1/auth/login` - login\
`POST /api/v1/auth/forgot-password` - send reset password email\
`POST /api/v1/auth/reset-password` - reset password

**User routes**:\
`POST /api/v1/users` - create a user\
`GET /api/v1/users/:userId` - get user\
`PATCH /api/v1/users/:userId` - update user\
`POST /api/v1/users/upload-profile-picture` - upload profile picture\
`DELETE /api/v1/users/delete-profile-picture` - delete profile picture\

**Media routes**:\
`POST api/v1/media/media` - upload media\
`GET api/v1/media` - get folder & media by user\
`GET api/v1/media/:folderId` - get media by folder & user\
`GET api/v1/media/media/:mediaId` - delete a media\

## Contributing

Contributions are more than welcome! Please check out the [contributing guide](CONTRIBUTING.md).

## License

[MIT](LICENSE)
