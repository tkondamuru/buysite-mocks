export async function handleSecurityQuestions(request) {
  const questions = [
    { id: 1, question: "In what city were you born?" },
    { id: 2, question: "What high school did you attend?" },
    { id: 3, question: "What is the name of your first school?" },
    { id: 4, question: "Which phone number do you remember?" },
    { id: 5, question: "What is your favorite movie?" },
    { id: 6, question: "Who is your favorite actor, musician, or artist?" },
    { id: 7, question: "What is your favorite color?" },
    { id: 8, question: "What is your favorite place to visit?" },
    { id: 9, question: "What is your father's middle name?" },
    { id: 10, question: "What street did you grow up on?" },
    { id: 11, question: "What was the make of your first car?" },
    { id: 12, question: "What is the name of your first grade teacher?" },
    { id: 13, question: "What was your high school mascot?" },
    { id: 14, question: "What is the name of your favorite pet?" }
  ];

  return new Response(JSON.stringify(questions), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
} 