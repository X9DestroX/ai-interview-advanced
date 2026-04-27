import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const generateNextQuestion = async (
  conversation,
  questionCount,
  role
) => {
  try {

    // COMMON FIRST QUESTIONS (ALL ROLES)
    if (questionCount === 0) {
      return "Tell me about yourself.";
    }

    if (questionCount === 1) {
      return "How many years of experience do you have?";
    }

    if (questionCount === 2) {
      return "What technologies or tools have you worked with?";
    }

    // ROLE-SPECIFIC PROMPT
    const rolePrompt = `
You are conducting an interview for the role: ${role}

Focus ONLY on ${role} topics.

Role Guidelines:
- Frontend → React, UI, performance, state management
- Backend → APIs, databases, authentication, scalability
- HR → communication, behavior, teamwork, conflict resolution
`;

    // AI QUESTION GENERATION
    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      messages: [
        {
          role: "system",
          content: `
${rolePrompt}

You are a senior professional interviewer.

STRICT RULES:
- Ask ONLY one question
- NEVER repeat previous questions
- Ask based on candidate's LAST answer
- Increase difficulty gradually
- Focus on real-world scenarios
- Do NOT explain anything

FLOW:
Intro → Experience → Tools → Role-specific technical → Advanced
`
        },
        ...conversation
      ],
    });

    return response.choices[0].message.content.trim();

  } catch (error) {
    console.error("Groq Error:", error.message);
    return "Can you tell me more about your experience?";
  }
};
