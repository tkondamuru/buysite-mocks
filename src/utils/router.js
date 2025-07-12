/**
 * Simple Router Utility
 * Handles routing for different endpoints
 */

export class Router {
  constructor() {
    this.routes = new Map();
  }

  // Register a route handler
  register(method, path, handler) {
    const key = `${method}:${path}`;
    this.routes.set(key, handler);
  }

  // Get handler for a specific method and path
  getHandler(method, path) {
    const key = `${method}:${path}`;
    return this.routes.get(key);
  }

  // Handle the request
  async handle(request) {
    const url = new URL(request.url);
    const method = request.method;
    const path = url.pathname;

    // Handle CORS preflight requests
    if (method === "OPTIONS") {
      return new Response(null, {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type"
        }
      });
    }

    // Get the appropriate handler
    const handler = this.getHandler(method, path);
    
    if (handler) {
      return await handler(request);
    }

    // Return 404 for unmatched routes
    return new Response("Not Found", { 
      status: 404,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type"
      }
    });
  }
} 