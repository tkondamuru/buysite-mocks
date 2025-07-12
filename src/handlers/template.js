/**
 * Handler Template
 * Use this as a template for creating new handlers
 */

export async function handleTemplate(request) {
  // Check method
  if (request.method !== "GET") {
    return new Response("Method not allowed", { status: 405 });
  }

  // Handle the request
  try {
    // Your handler logic here
    const response = {
      message: "This is a template handler",
      timestamp: new Date().toISOString()
    };

    return new Response(JSON.stringify(response), {
      headers: { 
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type"
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { 
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type"
      }
    });
  }
}

/**
 * Usage:
 * 1. Copy this template
 * 2. Rename the function to match your endpoint
 * 3. Update the method check and logic
 * 4. Add the route in src/index.js
 * 5. Export from src/handlers/index.js
 */ 