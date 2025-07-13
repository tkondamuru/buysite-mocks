/**
 * Default Handler
 * Handles GET requests to the root path and returns README content
 */

export async function handleDefault(request) {
  if (request.method !== "GET") {
    return new Response("Method not allowed", { status: 405 });
  }

  const readmeContent = `# Buysite Mocks API

A Cloudflare Workers project that provides mock authentication endpoints for testing and development purposes.

## Available Endpoints

### POST /api/login
Authenticates a user and returns a JWT token.

**Request Body:**
\`\`\`json
{
  "username": "string",
  "password": "string"
}
\`\`\`

**Response (Success - 200):**
\`\`\`json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
\`\`\`

**Response (Unauthorized - 401):**
\`\`\`json
{
  "error": "Unauthorized"
}
\`\`\`

### GET /api/{username}/shops
Returns shops data for a specific username.

**Path Parameters:**
- \`username\` - The username to get shops for

**Response (CUS9999 - 200):**
\`\`\`json
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
\`\`\`

**Response (Other usernames - 200):**
\`\`\`json
{
  "shops": []
}
\`\`\`

### Test Credentials
- **Username**: \`cus9999\`
- **Password**: \`test5PGW\`

## Development

### Local Development
\`\`\`bash
wrangler dev
\`\`\`

### Testing
\`\`\`bash
curl -X POST http://localhost:8787/api/login \\
  -H "Content-Type: application/json" \\
  -d '{"username": "cus9999", "password": "test5PGW"}'
\`\`\`

## Deployment
\`\`\`bash
wrangler deploy
\`\`\`

For more information, visit: https://github.com/tkondamuru/buysite-mocks
`;

  return new Response(readmeContent, {
    headers: { 
      "Content-Type": "text/markdown",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    }
  });
} 