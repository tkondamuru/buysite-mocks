/**
 * Simple Router Utility
 * Handles routing for different endpoints including dynamic routes
 */

export class Router {
  constructor() {
    this.routes = new Map();
    this.dynamicRoutes = new Map();
  }

  // Register a route handler
  register(method, path, handler) {
    const key = `${method}:${path}`;
    this.routes.set(key, handler);
  }

  // Register a dynamic route handler (with path parameters)
  registerDynamic(method, pathPattern, handler) {
    const key = `${method}:${pathPattern}`;
    this.dynamicRoutes.set(key, handler);
  }

  // Check if a path matches a pattern and extract parameters
  matchPattern(pattern, path) {
    const patternParts = pattern.split('/');
    const pathParts = path.split('/');
    
    if (patternParts.length !== pathParts.length) {
      return null;
    }
    
    const params = {};
    
    for (let i = 0; i < patternParts.length; i++) {
      if (patternParts[i].startsWith('{') && patternParts[i].endsWith('}')) {
        // Extract parameter name
        const paramName = patternParts[i].slice(1, -1);
        params[paramName] = pathParts[i];
      } else if (patternParts[i] !== pathParts[i]) {
        return null;
      }
    }
    
    return params;
  }

  // Get handler for a specific method and path
  getHandler(method, path) {
    // First check exact matches
    const key = `${method}:${path}`;
    const exactHandler = this.routes.get(key);
    if (exactHandler) {
      return exactHandler;
    }

    // Then check dynamic routes
    for (const [routeKey, handler] of this.dynamicRoutes) {
      const [routeMethod, routePattern] = routeKey.split(':', 2);
      if (routeMethod === method) {
        const params = this.matchPattern(routePattern, path);
        if (params) {
          // Return a wrapper that adds params to the request
          return async (request) => {
            // Add params to request for handler access
            request.params = params;
            return await handler(request);
          };
        }
      }
    }

    return null;
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