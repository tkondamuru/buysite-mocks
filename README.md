# Buysite Mocks

A Cloudflare Workers project that provides mock authentication endpoints for testing and development purposes.

## Overview

This project implements a simple JWT-based authentication mock service using Cloudflare Workers. It provides a `/api/login` endpoint that accepts username/password credentials and returns a JWT token for valid credentials.

## Features

- **Mock Authentication**: Simulates a login endpoint for testing purposes
- **JWT Token Generation**: Creates valid JWT tokens with configurable expiration
- **Simple Credentials**: Uses hardcoded test credentials for easy testing
- **Cloudflare Workers**: Built on Cloudflare's edge computing platform

## API Documentation

### POST /api/login

Authenticates a user and returns a JWT token.

**Request Body:**
```json
{
  "username": "string",
  "password": "string"
}
```

**Response (Success - 200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response (Unauthorized - 401):**
```json
{
  "error": "Unauthorized"
}
```

### GET /api/{username}/shops

Returns shops data for a specific username.

**Path Parameters:**
- `username` - The username to get shops for

**Response (CUS9999 - 200):**
```json
{
  "shops": [
    {
      "name": "TED'S AUTO BODY",
      "address": "100-354002 128TH STREET WEST, BLACK DIAMOND, AB, T0L 0H0",
      "shipto": "62862"
    },
    {
      "name": "CAN-AM AUTO GLASS",
      "address": "5315 4 ST SE, CALGARY, AB, T2H 1K6",
      "shipto": "49124"
    }
  ]
}
```

**Response (Other usernames - 200):**
```json
{
  "shops": []
}
```

### GET /api/security/all_questions

Returns a list of all available security questions with incremental IDs.

**Response (200):**
```json
[
  { "id": 1, "question": "In what city were you born?" },
  { "id": 2, "question": "What high school did you attend?" },
  { "id": 3, "question": "What is the name of your first school?" },
  { "id": 4, "question": "Which phone number do you remember?" },
  { "id": 5, "question": "What is your favorite movie?" },
  { "id": 6, "question": "Who is your favorite actor, musician, or artist?" },
  { "id": 7, "question": "What is your favorite color?" },
  { "id": 8, "question": "What is your favorite place to visit?" },
  { "id": 9, "question": "What is your father's middle name?" },
  { "id": 10, "question": "What street did you grow up on?" },
  { "id": 11, "question": "What was the make of your first car?" },
  { "id": 12, "question": "What is the name of your first grade teacher?" },
  { "id": 13, "question": "What was your high school mascot?" },
  { "id": 14, "question": "What is the name of your favorite pet?" }
]
```

### GET /api/security/{username}/profile

Returns user security profile with email and security questions.

**Path Parameters:**
- `username` - The username to get profile for

**Response (200):**
```json
{
  "email": "tkondamuru@pgwautoglass.com",
  "questions": [
    { "id": 1, "question": "In what city were you born?", "answer": "TEST" },
    { "id": 2, "question": "What high school did you attend?", "answer": "TEST" },
    { "id": 3, "question": "What is the name of your first school?", "answer": "TEST" },
    { "id": 4, "question": "Which phone number do you remember?", "answer": "TEST" },
    { "id": 5, "question": "What is your favorite movie?", "answer": "TEST" }
  ]
}
```

### PUT /api/security/{username}/email

Updates user email address.

**Path Parameters:**
- `username` - The username to update email for

**Request Body:**
```json
{
  "email": "newemail@example.com"
}
```

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Email updated successfully for user username",
  "email": "newemail@example.com"
}
```

**Response (Error - 400):**
```json
{
  "error": "Email is required"
}
```

### PUT /api/security/{username}/password

Updates user password.

**Path Parameters:**
- `username` - The username to update password for

**Request Body:**
```json
{
  "password": "newpassword123"
}
```

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Password updated successfully for user username"
}
```

**Response (Error - 400):**
```json
{
  "error": "Password is required"
}
```

### Test Credentials

- **Username**: `cus9999`
- **Password**: `test5PGW`

## Development

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/tkondamuru/buysite-mocks.git
cd buysite-mocks
```

2. Install dependencies (if any):
```bash
npm install
```

### Local Development

Run the project locally using Wrangler:

```bash
wrangler dev
```

The service will be available at `http://localhost:8787`.

### Testing

You can test the API using curl:

```bash
curl -X POST http://localhost:8787/api/login \
  -H "Content-Type: application/json" \
  -d '{"username": "cus9999", "password": "test5PGW"}'
```

## Deployment

### Deploy to Cloudflare Workers

1. Authenticate with Cloudflare:
```bash
wrangler login
```

2. Deploy the worker:
```bash
wrangler deploy
```

The worker will be deployed to your Cloudflare account and available at your worker URL.

## Project Structure

```
buysite-mocks/
├── src/
│   ├── index.js              # Main worker entry point
│   ├── handlers/
│   │   ├── index.js          # Handler exports
│   │   ├── loginHandler.js   # POST /api/login handler
│   │   ├── defaultHandler.js # GET / handler (README)
│   │   ├── shopsHandler.js   # GET /api/{username}/shops handler
│   │   ├── securityQuestionsHandler.js # GET /api/security/all_questions handler
│   │   ├── securityProfileHandler.js   # GET /api/security/{username}/profile handler
│   │   ├── updateEmailHandler.js       # PUT /api/security/{username}/email handler
│   │   ├── updatePasswordHandler.js    # PUT /api/security/{username}/password handler
│   │   └── template.js       # Handler template
│   ├── utils/
│   │   └── router.js         # Simple router utility
│   └── data/
│       └── shops.json        # Shops data file
├── wrangler.toml             # Wrangler configuration
└── README.md                # This file
```

## Project Architecture

The project uses a modular structure with separate handlers for each endpoint:

- **Router**: Simple routing utility in `src/utils/router.js`
- **Handlers**: Individual endpoint handlers in `src/handlers/`
- **Main Entry**: Routes registration in `src/index.js`

### Adding New Endpoints

1. Create a new handler file in `src/handlers/` (use `template.js` as reference)
2. Export the handler function
3. Add the export to `src/handlers/index.js`
4. Register the route in `src/index.js`

Example:
```javascript
// src/handlers/newEndpoint.js
export async function handleNewEndpoint(request) {
  // Your handler logic
}

// src/handlers/index.js
export { handleNewEndpoint } from './newEndpoint.js';

// src/index.js
router.register('GET', '/api/new-endpoint', handleNewEndpoint);
```

## Configuration

The project is configured via `wrangler.toml`:

- **name**: Worker name (`buysite-mocks`)
- **main**: Entry point (`src/index.js`)
- **type**: JavaScript worker
- **compatibility_date**: Cloudflare Workers compatibility date

## Security Notes

⚠️ **Important**: This is a mock service intended for development and testing only. The hardcoded credentials and simple JWT implementation should never be used in production environments.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For issues and questions, please open an issue on the [GitHub repository](https://github.com/tkondamuru/buysite-mocks). 