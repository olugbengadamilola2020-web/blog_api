## BLOG API

A REST API for a blog service, built with Node.js, Express, MongoDB Atlas, and Mongoose. Users register and log in to manage their own notes.

## Features

- JWT authentication
- Create, list, retrieve, update, and delete articles
- User-owned articles: a user can only access their own articles
- Pagination with `page` and `limit`
- Sorting with `sort`
- Text search across note titles and content using `search` or `q`
- Request validation and JSON error responses

## Requirements

- Node.js and npm
- A MongoDB database, such as MongoDB Atlas

## Run locally

From the project directory:

```bash
npm install
```

Create a private `.env` file in this directory. You can use `.env.example` as a reference, but replace its example values:

```env
PORT=7000
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>/<database>?retryWrites=true&w=majority
JWT_SECRET_KEY=<a-long-random-secret>
JWT_EXPIRES=3d
```

Generate a random JWT secret locally:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Do not commit `.env` or share its contents. Start the development server with:

```bash
npm run dev
```

The API listens on the configured `PORT` (3000 by default). `GET /` returns a basic health response and endpoint hints.

## Run tests

Run the authentication, request-validation, owner-scoped CRUD, note-query, and error-response tests with:

```bash
npm test
```

## Authentication

Register a user:

```http
POST /api/user/sign-up
Content-Type: application/json
```

```json
{
  "name": "Alex Example",
  "email": "alex@example.com",
  "password": "a-long-password"
}
```

Log in with `POST /api/user/login` and the same `email` and `password` fields. Both endpoints return a JWT in the `token` field. Include it on every notes request:

```http
Authorization: Bearer <token>
```

## Blog API

All note endpoints require a valid bearer token.

### Create an article

`POST /api/articles`

```json
{
  "title": "Meeting notes",
  "content": "Discuss the project milestones.",
  "category": "Tech",
  "author": "Alex",
  "isPublished": "false",
  "description": " ",
}
```

`title`, `content`, and `category` are required. `author`, `isPublished`, and `description` are optional.

### List articles

`GET /api/articles?page=1&limit=10&sort=-createdAt`

Supported sort fields are `createdAt`, `updatedAt`, `title`, and `category`. Prefix a field with `-` for descending order. The default is `-createdAt`; page defaults to 1 and limit defaults to 10, with a maximum limit of 100.
If `page` or `limit` is supplied, it must be a positive integer; invalid values return `400`.

Search titles and content with either `search` or `q`:

```http
GET /api/articles?search=project&page=1&limit=10
GET /api/articles/:id?q=milestones&sort=-updatedAt
```

### Retrieve one article

`GET /api/articles/:id`

### Update an article

`PUT /api/articles/:id`


### Delete an article

`DELETE /api/article/:id`

The API returns `404` when the article does not exist or does not belong to the authenticated user.

## Deployment on Render

1. Push the project to a GitHub repository.
2. In Render, create a **Blueprint** connected to the repository containing `render.yaml`.
3. When prompted, enter the following secret environment variables privately in Render:
   - `MONGODB_URI` — your MongoDB Atlas connection string
   - `JWT_SECRET_KEY` — a strong, randomly generated secret
4. Apply the Blueprint and deploy the service. Render provides `PORT`; the app defaults to `7000` locally.
5. Verify the service by opening its root URL. The health response should say `Blog API is running`.

The Blueprint configures `JWT_EXPIRES=3d`, health checks at `/`, and the Node.js build and start commands. Never add database credentials or JWT secrets to `render.yaml`.

**Live API URL:** _Add the deployed Render URL here after deployment.