export async function handleSecurityProfile(request, params) {
  const username = request.params?.username;
  
  const profile = {
    email: "tkondamuru@pgwautoglass.com",
    questions: [
      { id: 1, question: "In what city were you born?", answer: "TEST" },
      { id: 2, question: "What high school did you attend?", answer: "TEST" },
      { id: 3, question: "What is the name of your first school?", answer: "TEST" },
      { id: 4, question: "Which phone number do you remember?", answer: "TEST" },
      { id: 5, question: "What is your favorite movie?", answer: "TEST" }
    ]
  };

  return new Response(JSON.stringify(profile), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
} 