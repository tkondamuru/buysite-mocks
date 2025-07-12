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
│   └── index.js          # Main worker code
├── wrangler.toml         # Wrangler configuration
└── README.md            # This file
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