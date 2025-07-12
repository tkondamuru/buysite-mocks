/**
 * Login Handler
 * Handles POST /api/login requests
 */

export async function handleLogin(request) {
  if (request.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  const { username, password } = body;

  if (username === "cus9999" && password === "test5PGW") {
    const header = {
      alg: "HS256",
      typ: "JWT"
    };

    const payload = {
      sub: username,
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24
    };

    const base64Encode = obj => btoa(JSON.stringify(obj)).replace(/=+$/, "").replace(/\+/g, "-").replace(/\//g, "_");
    const unsignedToken = base64Encode(header) + "." + base64Encode(payload);
    const signature = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(unsignedToken + "secret"));
    const base64Signature = btoa(String.fromCharCode(...new Uint8Array(signature)))
      .replace(/=+$/, "")
      .replace(/\+/g, "-")
      .replace(/\//g, "_");

    const token = unsignedToken + "." + base64Signature;

    return new Response(JSON.stringify({ token }), {
      headers: { "Content-Type": "application/json" }
    });
  }

  return new Response(JSON.stringify({ error: "Unauthorized" }), {
    status: 401,
    headers: { "Content-Type": "application/json" }
  });
} 