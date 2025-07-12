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